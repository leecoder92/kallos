package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Item;
import com.ssafy.db.repository.ItemRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("itemService")
public class ItemServiceImpl implements ItemService {
	@Autowired
    ItemRepository itemRepository;

	@Override
	public Item createItem(String address, String name, String description, String tokenId, String title, String img) {
		Item item = new Item();
		item.setAuthorAddress(address);
		item.setAuthorName(name);
		item.setDescription(description);
		item.setTokenId(tokenId);
		item.setTitle(title);
		item.setOwnerAddress(address);
		item.setOnSaleYN(0);
		item.setPrice(0);
		item.setItemImg(img);
		item.setCreated_at(LocalDateTime.now());
		return itemRepository.save(item);
	}

	@Override
	public List<Item> getItemByAddress(String address) {
		List<Item> items = itemRepository.findByAuthorAddress(address);
		return items;
	}

	@Override
	public Item getItemByName(String name) {
		Item item = itemRepository.findByAuthorName(name).get();
		return item;
	}

	@Override
	public Item getItemByTokenId(String tokenId) {
		Item item = itemRepository.findByTokenId(tokenId).get();
		return item;
	}
}
