package com.hospitalapp.hospital_appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospitalapp.hospital_appointment.model.Hour;

public interface HourRepository extends JpaRepository<Hour, Long> {
    List<Hour> findByDayContaining(String day);
}
