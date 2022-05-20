package com.hospitalapp.hospital_appointment.repository;

import com.hospitalapp.hospital_appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    public List<Appointment> findByUserId(Long userId);
}
