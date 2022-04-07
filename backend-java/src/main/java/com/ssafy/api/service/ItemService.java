package com.ssafy.api.service;

import com.ssafy.db.entity.Item;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ItemService {
	Item createItem(String address, String name, String description, String token_id, String title, String img);
	List<Item> getItemByAddress(String address);
	Item getItemByName(String name);
	Item getItemByTokenId(String tokenId);
}
