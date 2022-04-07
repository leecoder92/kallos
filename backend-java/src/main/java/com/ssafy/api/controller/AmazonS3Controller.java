package com.ssafy.api.controller;

import com.ssafy.api.service.AwsS3Service;
//import io.swagger.annotations.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

/**
 * S3 API 요청 처리를 위한 컨트롤러 정의.
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/s3")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;

    /**
     * Amazon S3에 이미지 업로드
     * @return 성공 시 200 Success와 함께 업로드 된 파일의 파일명 리스트 반환
     */
    @PostMapping("/image")
    @ApiOperation(value = "Amazon S3에 이미지 업로드", notes = "Amazon S3에 이미지 업로드 ")
    public ResponseEntity<List<String>> uploadImage(@ApiParam(value="img 파일들(여러 파일 업로드 가능)", required = true) @RequestPart(value="file",required = false) List<MultipartFile> multipartFile) {
        return ResponseEntity.ok(awsS3Service.uploadImage(multipartFile));
    }

    /**
     * Amazon S3에 이미지 업로드 된 파일을 삭제
     * @return 성공 시 200 Success
     */
    @DeleteMapping("/image")
    @ApiOperation(value = "Amazon S3에 업로드 된 파일을 삭제", notes = "Amazon S3에 업로드된 이미지 삭제")
    public ResponseEntity<Void> deleteImage(@ApiParam(value="img 파일 하나 삭제", required = true) @RequestParam String fileName) {
        awsS3Service.deleteImage(fileName);
        return ResponseEntity.ok(null);
    }
}
