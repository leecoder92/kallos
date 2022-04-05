package com.ssafy.api.controller;

import com.ssafy.api.service.AwsS3Service;
import com.ssafy.api.service.ItemService;
import com.ssafy.api.service.ItemServiceImpl;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Item;
import com.ssafy.db.repository.ItemRepository;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * 아이템 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "아이템 API", tags = {"Item"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/item")
public class ItemController {

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	ItemService itemService;

	@Autowired
	ItemServiceImpl itemServiceImpl;

	private final AwsS3Service awsS3Service;

	@PostMapping("/create")
	public ResponseEntity createNFT(
			@RequestPart(value="file",required = false) List< MultipartFile > multipartFile,
			@RequestPart(value="address",required = false) String address,
			@RequestPart(value="name",required = false) String name,
			@RequestPart(value="description",required = false) String description,
			@RequestPart(value="tokenId",required = false) String tokenId,
			@RequestPart(value="title",required = false) String title) {

		Optional<Item> isItem = itemRepository.findByTokenId(tokenId);
		if(isItem.isPresent()) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "중복된 토큰 아이디입니다"));
		}


		String imgString = awsS3Service.uploadImage(multipartFile).get(0);
		itemService.createItem(address, name, description, tokenId, title, imgString);

		Item item = itemServiceImpl.getItemByTokenId(tokenId);
		return new ResponseEntity(item,HttpStatus.OK);
	}

	@GetMapping("/detail/{tokenId}")
	public ResponseEntity itemInfo (@PathVariable String tokenId) {
		String token = tokenId;

		Optional<Item> item = itemRepository.findByTokenId(token);

		return new ResponseEntity(item,HttpStatus.OK);
	}

	@PutMapping("/sell")
	public ResponseEntity sellItem (@RequestBody Map<String,Object> body) {
		String tokenId = body.get("tokenId").toString();
		int price = Integer.parseInt(body.get("price").toString());

		Item item = itemServiceImpl.getItemByTokenId(tokenId);
		item.setPrice(price);
		item.setOnSaleYN(1);
		itemRepository.save(item);

		return new ResponseEntity(HttpStatus.OK);
	}

	@PutMapping("/cancel")
	public ResponseEntity sellItemCancel (@RequestBody Map<String,Object> body) {
		String tokenId = body.get("tokenId").toString();

		Item item = itemServiceImpl.getItemByTokenId(tokenId);
		item.setPrice(0);
		item.setOnSaleYN(0);
		itemRepository.save(item);

		return new ResponseEntity(HttpStatus.OK);
	}


	@PutMapping("/buy")
	public ResponseEntity buyItem (@RequestBody Map<String,Object> body) {
		String tokenId = body.get("tokenId").toString();
		String address = body.get("address").toString();

		Item item = itemServiceImpl.getItemByTokenId(tokenId);
		item.setOwnerAddress(address);
		itemRepository.save(item);

		return new ResponseEntity(HttpStatus.OK);
	}

	@GetMapping("/search/{keyword}")
	public ResponseEntity getSearchItems (@PathVariable String keyword) {
		String keywords = keyword;

		List<Item> itemsByTitle = itemRepository.findByTitleContains(keywords);
		List<Item> itemsByName = itemRepository.findByAuthorNameContains(keywords);

		Map resMap = new HashMap()
		{
			{
				put("itemsByTitle", itemsByTitle);
				put("itemsByName", itemsByName);
			}
		};
		return new ResponseEntity(resMap,HttpStatus.OK);
	}

	@GetMapping("/view")
	public ResponseEntity getItems (
			@RequestParam("option") String option,
			@RequestParam("keyword") String keyword,
			@RequestParam("pageNo") String pageNum,
			@RequestParam("itemPerPage") String itemPerPages,
			@RequestParam("onSaleYN") String onSaleYNs
	) {

		int pageNo = Integer.parseInt(pageNum);
		int itemPerPage = Integer.parseInt(itemPerPages);
		int onSaleYN = Integer.parseInt(onSaleYNs);

		if (option.equals("all")) {
			List<Item> itemsByTitle = itemRepository.findByTitleContains(keyword);
			List<Item> itemsByName = itemRepository.findByAuthorNameContains(keyword);

			List<Item> allItems = new ArrayList<>();
			for (int i=0; i<itemsByTitle.size(); i++){
				Item item = itemsByTitle.get(i);
				allItems.add(item);
			}
			for (int i=0; i<itemsByName.size(); i++){
				Item item = itemsByName.get(i);
				allItems.add(item);
			}

			for (int i = 0; i<allItems.size(); i++) {
				for (int j = 0; j<allItems.size(); j++) {
					if(i==j){
					} else if (allItems.get(j).getTokenId().equals(allItems.get(i).getTokenId())) {
						allItems.remove(j);
					}
				}
			}

			List<Item> onSaleItems = new ArrayList<Item>();
			if (onSaleYN == 0) {
				onSaleItems = onSaleYN(allItems, 0);
			} else {
				onSaleItems = onSaleYN(allItems, 1);
			}

			List<Item> finalOnSaleItems = onSaleItems;

			int itemCnt = finalOnSaleItems.size();
			int count = itemCnt;
			int totalPage = count/itemPerPage;

			List<Item> pageItems = new ArrayList<>();

			int cntValue = 0;
			for (int i=itemPerPage*(pageNo-1); i<finalOnSaleItems.size(); i++){
				Item item = finalOnSaleItems.get(i);
				pageItems.add(item);
				cntValue++;
				if(cntValue == itemPerPage) {
					break;
				}
			}

			int finalTotalPage = totalPage;
			Map resMap = new HashMap()
			{
				{
					put("pageNo", pageNo);
					put("itemPerPage", itemPerPage);
					put("totalPage", finalTotalPage);
					put("itemsByAll", pageItems);
				}
			};
			return new ResponseEntity(resMap,HttpStatus.OK);
		} else if (option.equals("title")) {
			List<Item> itemsByTitle = itemRepository.findByTitleContains(keyword);

			List<Item> onSaleItems = new ArrayList<Item>();
			if (onSaleYN == 0) {
				onSaleItems = onSaleYN(itemsByTitle, 0);
			} else {
				onSaleItems = onSaleYN(itemsByTitle, 1);
			}

			List<Item> finalOnSaleItems = onSaleItems;

			int itemCnt = finalOnSaleItems.size();
			int count = itemCnt;
			int totalPage = count/itemPerPage;

			List<Item> pageItems = new ArrayList<>();

			int cntValue = 0;
			for (int i=itemPerPage*(pageNo-1); i<finalOnSaleItems.size(); i++){
				Item item = finalOnSaleItems.get(i);
				pageItems.add(item);
				cntValue++;
				if(cntValue == itemPerPage) {
					break;
				}
			}

			int finalTotalPage = totalPage;
			Map resMap = new HashMap()
			{
				{
					put("pageNo", pageNo);
					put("itemPerPage", itemPerPage);
					put("totalPage", finalTotalPage);
					put("itemsByAll", pageItems);
				}
			};
			return new ResponseEntity(resMap,HttpStatus.OK);
		} else if (option.equals("name")) {
			List<Item> itemsByName = itemRepository.findByAuthorNameContains(keyword);

			List<Item> onSaleItems = new ArrayList<Item>();
			if (onSaleYN == 0) {
				onSaleItems = onSaleYN(itemsByName, 0);
			} else {
				onSaleItems = onSaleYN(itemsByName, 1);
			}

			List<Item> finalOnSaleItems = onSaleItems;

			int itemCnt = finalOnSaleItems.size();
			int count = itemCnt;
			int totalPage = count/itemPerPage;

			List<Item> pageItems = new ArrayList<>();

			int cntValue = 0;
			for (int i=itemPerPage*(pageNo-1); i<finalOnSaleItems.size(); i++){
				Item item = finalOnSaleItems.get(i);
				pageItems.add(item);
				cntValue++;
				if(cntValue == itemPerPage) {
					break;
				}
			}

			int finalTotalPage = totalPage;
			Map resMap = new HashMap()
			{
				{
					put("pageNo", pageNo);
					put("itemPerPage", itemPerPage);
					put("totalPage", finalTotalPage);
					put("itemsByAll", pageItems);
				}
			};
			return new ResponseEntity(resMap,HttpStatus.OK);
		} else {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유효하지 않은 옵션입니다"));
		}
	}

	public List<Item> onSaleYN(List<Item> items, int YN) {
		List<Item> distinctItems = new ArrayList<Item>();
		if(YN == 0) {
			for (int i=0; i<items.size(); i++) {
				if(items.get(i).getOnSaleYN() == 0) {
					distinctItems.add(items.get(i));
				}
			}
			return distinctItems;
		} else {
			for (int i=0; i<items.size(); i++) {
				if(items.get(i).getOnSaleYN() == 1) {
					distinctItems.add(items.get(i));
				}
			}
			return distinctItems;
		}
	}

}