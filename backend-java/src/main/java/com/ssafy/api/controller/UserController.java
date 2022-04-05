package com.ssafy.api.controller;

import com.ssafy.api.service.*;
import com.ssafy.db.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.db.repository.UserRepository;

import com.ssafy.api.service.UserServiceImpl;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.Item;

import io.swagger.annotations.Api;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@Autowired
	UserServiceImpl userServiceImpl;

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	ItemService itemService;

	@Autowired
	ItemServiceImpl itemServiceImpl;


	private final AwsS3Service awsS3Service;

	@GetMapping("/login/{address}")
	public ResponseEntity loginInfo (@PathVariable String address){
		String userAddress = address;

		Optional<User> user = userRepository.findByAddress(userAddress);
		if(user.isPresent()) {
			System.out.printf("기존유저");
			return new ResponseEntity(user,HttpStatus.OK);
		} else {
			System.out.printf("첫유저");
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "FirstVisit"));
		}
	}

	@PostMapping("/register")
	public ResponseEntity register(@RequestBody Map<String,Object> body) {
		String userAddress = body.get("address").toString();
		String userName = body.get("name").toString();

		String check = userService.checkUser(userAddress, userName);
		if(check.equals("duplicateAddress")){
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미 등록된 지갑주소입니다"));
		} else if (check.equals("duplicateName")) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미 존재하는 유저명입니다"));
		} else {
			userService.createUser(userAddress, userName);
			Optional<User> user = userRepository.findByAddress(userAddress);
			return new ResponseEntity(user,HttpStatus.OK);
		}
	}

	@GetMapping("/mypage/userInfo/{address}")
	public ResponseEntity getUserInfo (@PathVariable String address){
		String userAddress = address;

		Optional<User> user = userRepository.findByAddress(userAddress);
		if(user.isPresent()) {
			return new ResponseEntity(user,HttpStatus.OK);
		} else {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "존재하지 않는 유저입니다"));
		}
	}

	@GetMapping("/mypage/items")
	public ResponseEntity getMyItems (
			@RequestParam("address") String address,
			@RequestParam("pageNo") String pageNum,
			@RequestParam("itemPerPage") String itemPerPages
	) {
		String userAddress = address;
		int pageNo = Integer.parseInt(pageNum);
		int itemPerPage = Integer.parseInt(itemPerPages);



		int itemCnt = itemRepository.countByOwnerAddress(userAddress);
		int count = itemCnt;
		int totalPage = count/itemPerPage;

		if(count%itemPerPage!=0) {
			totalPage += 1;
		}

		List<Item> items = itemRepository.findByAuthorAddress(userAddress);

		List<Item> pageItems = new ArrayList<>();

		int cntValue = 0;
		for (int i=itemPerPage*(pageNo-1); i<items.size(); i++){
			Item item = items.get(i);
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
				put("items", pageItems);
			}

		};

		return new ResponseEntity(resMap, HttpStatus.OK);
	}



	@PutMapping("/mypageupdate")
	public ResponseEntity updateMyInfo(
			@RequestPart(value="file",required = false) List< MultipartFile > multipartFile,
			@RequestPart(value="address",required = false) String address,
			@RequestPart(value="name",required = false) String name,
			@RequestPart(value="description",required = false) String description) {

		Optional<User> userInfo = userRepository.findByAddress(address);
		if(!userInfo.isPresent()) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "존재하지 않는 유저입니다"));
		}

		User user = userServiceImpl.getUserByAddress(address);
		user.setName(name);
		user.setDescription(description);
		user.setProfile_img(awsS3Service.uploadProfileImage(multipartFile).get(0));
		userRepository.save(user);

		userInfo = userRepository.findByAddress(address);
		return new ResponseEntity(userInfo,HttpStatus.OK);
	}

	@GetMapping("/artist/{address}")
	public ResponseEntity getArtistInfo (@PathVariable Long address){
		String userAddress = address.toString();

		Optional<User> user = userRepository.findByAddress(userAddress);
		if(user.isPresent()) {
			return new ResponseEntity(user,HttpStatus.OK);
		} else {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "존재하지 않는 유저입니다"));
		}
	}

	@GetMapping("/artist/items")
	public ResponseEntity getArtistItems (
			@RequestParam("address") String address,
			@RequestParam("pageNo") String pageNum,
			@RequestParam("itemPerPage") String itemPerPages
	) {
		String userAddress = address;
		int pageNo = Integer.parseInt(pageNum);
		int itemPerPage = Integer.parseInt(itemPerPages);

		int itemCnt = itemRepository.countByAuthorAddress(userAddress);
		int count = itemCnt;
		int totalPage = count/itemPerPage;

		if(count%itemPerPage!=0) {
			totalPage += 1;
		}

		List<Item> items = itemRepository.findByAuthorAddress(userAddress);

		List<Item> pageItems = new ArrayList<>();

		int cntValue = 0;
		for (int i=itemPerPage*(pageNo-1); i<items.size(); i++){
			Item item = items.get(i);
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
				put("items", pageItems);
			}

		};

		return new ResponseEntity(resMap, HttpStatus.OK);
	}
}
