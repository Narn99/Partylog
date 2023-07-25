package com.ssafy.partylog.common.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    public static String getUserNo(String token, String secretkey) {
        return Jwts.parser().setSigningKey(secretkey).parseClaimsJws(token)
                .getBody().get("userNo", String.class);
    }

    public static boolean isExpired(String token, String secretkey) {
        return Jwts.parser().setSigningKey(secretkey).parseClaimsJws(token)
                .getBody().getExpiration().before(new Date());
    }
    public static String createJwt(int userNo, String type, String secretkey, Long validTime) {
        Claims claims = Jwts.claims();
        claims.put("userId", String.valueOf(userNo));
        claims.put("type", type);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + validTime))
                .signWith(SignatureAlgorithm.HS256, secretkey)
                .compact();
    }
}
