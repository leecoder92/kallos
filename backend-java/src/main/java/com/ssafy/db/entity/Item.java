package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long item_id = null;

    @Column(nullable = false)
    private String tokenId;

    @Column(nullable = false)
    private String itemImg;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String authorName;

    @Column(nullable = false)
    private String authorAddress;

    @Column(nullable = false)
    private String ownerAddress;

    @ColumnDefault("0")
    private Integer onSaleYN;

    @ColumnDefault("0")
    private Double price;

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Builder
    public Item (Long item_id, String tokenId, String itemImg,
                 String title,String description,String authorName,
                 String authorAddress,String ownerAddress,
                 Integer onSaleYN,Double price,LocalDateTime created_at) {

        this.item_id = item_id;
        this.tokenId = tokenId;
        this.itemImg = itemImg;
        this.title = title;
        this.description = description;
        this.authorName = authorName;
        this.authorAddress = authorAddress;
        this.ownerAddress = ownerAddress;
        this.onSaleYN = onSaleYN;
        this.price = price;
        this.created_at = created_at;
    }
}
