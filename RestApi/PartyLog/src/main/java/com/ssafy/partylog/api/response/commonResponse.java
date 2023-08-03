package com.ssafy.partylog.api.response;
import lombok.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class commonResponse<T> {

//    private static final String SUCCESS_STATUS = "200";
//    private static final String FAIL_STATUS = "400";
//    private static final String ERROR_STATUS = "500";

    private String status;
    private String message;
    private T data;

    public static <T> commonResponse<T> createResponse(String code, T data, String message) {
        return new commonResponse<>(code, message, data);
    }

    public static commonResponse<?> createResponseWithNoContent(String code, String message) {
        return new commonResponse<>(code, message, null);
    }

    // Hibernate Validator에 의해 유효하지 않은 데이터로 인해 API 호출이 거부될때 반환
//    public static commonResponse<?> createFail(BindingResult bindingResult) {
//        Map<String, String> errors = new HashMap<>();
//
//        List<ObjectError> allErrors = bindingResult.getAllErrors();
//        for (ObjectError error : allErrors) {
//            if (error instanceof FieldError) {
//                errors.put(((FieldError) error).getField(), error.getDefaultMessage());
//            } else {
//                errors.put( error.getObjectName(), error.getDefaultMessage());
//            }
//        }
//        return new commonResponse<>(FAIL_STATUS, "유효하지 않은 데이터", errors);
//    }

    // 예외 발생으로 API 호출 실패시 반환
//    public static commonResponse<?> createError(String message) {
//        return new commonResponse<>(ERROR_STATUS, message, null);
//    }

    private commonResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
