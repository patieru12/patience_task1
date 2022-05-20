package com.hospitalapp.hospital_appointment.controller;

import com.hospitalapp.hospital_appointment.model.Doctor;
import com.hospitalapp.hospital_appointment.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class DoctorController {
    @Autowired
    DoctorRepository doctorRepository;

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors(@RequestParam(required = false) String name){
        try {
            List<Doctor> doctors = new ArrayList<>();

            if (name == null) {
                doctors.addAll(doctorRepository.findAll());
            } else {
                doctors.addAll(doctorRepository.findByNameContaining(name));
            }
            return new ResponseEntity<>(doctors, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/doctors/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") long id){
        Optional<Doctor> doctorData = doctorRepository.findById(id);

        if(doctorData.isPresent()){
            return new ResponseEntity<>(doctorData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value="/doctors", consumes = {"application/json"})
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor){
        try{
            Doctor _doctor = doctorRepository
                    .save(new Doctor(doctor.getName(), doctor.getPhoneNumber()));
            return new ResponseEntity<>(_doctor, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/doctors/{id}")
    public ResponseEntity<Doctor> updateHour(@PathVariable("id") long id, @RequestBody Doctor doctor){
        Optional<Doctor> doctorData = doctorRepository.findById(id);
        if(doctorData.isPresent()){
            Doctor _doctor = doctorData.get();

            _doctor.setName(doctor.getName());
            _doctor.setPhoneNumber(doctor.getPhoneNumber());

            return new ResponseEntity<>(doctorRepository.save(_doctor), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") long id){
        try{
            doctorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
