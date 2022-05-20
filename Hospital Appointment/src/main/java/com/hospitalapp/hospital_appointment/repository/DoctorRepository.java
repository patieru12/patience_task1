package com.hospitalapp.hospital_appointment.repository;

import com.hospitalapp.hospital_appointment.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByNameContaining(String name);
}
