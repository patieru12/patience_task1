package com.hospitalapp.hospital_appointment.repository;

import java.util.Optional;

import com.hospitalapp.hospital_appointment.model.ERole;
import com.hospitalapp.hospital_appointment.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
