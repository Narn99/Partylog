package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.response.FollowResponse;
import com.ssafy.partylog.api.response.LetterResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LetterRepository extends JpaRepository<LetterEntity, Long> {

    @Query(value = "DELETE FROM letter WHERE letter_id = ?1", nativeQuery = true)
    void deleteByLetterId(String letterId);

    @Query(value = "SELECT * FROM letter WHERE letter_writer = ?1 AND year(letter_reg_date) = ?2 ORDER BY letter_reg_date DESC LIMIT ?3 OFFSET ?4", nativeQuery = true)
    List<LetterResponse> getLettersByWriter(int userNo, int year, int offset, int limit);

    @Query(value = "SELECT * FROM letter WHERE letter_receiver = ?1 AND year(letter_reg_date) = ?2 ORDER BY letter_reg_date DESC LIMIT ?3 OFFSET ?4", nativeQuery = true)
    List<LetterResponse> getLettersByReceiver(int userNo, int year, int offset, int limit);
    @Query(value = "SELECT * FROM letter WHERE letter_id = ?1", nativeQuery = true)
    LetterResponse getLettersByLetterId(String letterId);
}
