package com.ssafy.db.repository;

import com.ssafy.db.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
//    Optional<Item> findByAuthorAddress(String address);
    Optional<Item> findByAuthorName(String name);
    Optional<Item> findByTokenId(String tokenId);
    List<Item> findByAuthorAddress(String address);
    List<Item> findByTitleContains(String title);
    List<Item> findByAuthorNameContains(String title);
    int countByOwnerAddress(String address);
    int countByAuthorAddress(String address);
}