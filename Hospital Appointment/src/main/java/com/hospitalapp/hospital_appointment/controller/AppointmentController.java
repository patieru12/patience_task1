package com.hospitalapp.hospital_appointment.controller;

import com.hospitalapp.hospital_appointment.model.Appointment;

import com.hospitalapp.hospital_appointment.repository.AppointmentRepository;
import com.hospitalapp.hospital_appointment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class AppointmentController {
    @Autowired
    AppointmentRepository appointmentRepository;

    @GetMapping("/requests")
    public ResponseEntity<List<Appointment>> getAllRequests(){
        try {

            //Here try to get the list of user logged in.
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
            //System.out.println(user.getId());
            List<Appointment> appointments = new ArrayList<>();
            Long userId = user.getId();
            if (userId != null) {
                appointments.addAll(appointmentRepository.findByUserId(userId));
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value="/requests", consumes = {"application/json"})
    public ResponseEntity<Appointment> createRequest(@RequestBody Appointment appointment){
        try{
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();

            Appointment _appointment = appointmentRepository
                    .save(new Appointment(appointment.getDoctorId(), appointment.getTime(), user.getId()));
            return new ResponseEntity<>(_appointment, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/requests/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") long id){
        try{
            appointmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments(){
        try {

            //Here try to get the list of user logged in.
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();
            //System.out.println(user.getId());
            List<Appointment> appointments = new ArrayList<>();
            Long userId = user.getId();
            //System.out.println(user.getAuthorities());
            if (userId != null) {
                appointments.addAll(appointmentRepository.findAll());
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
