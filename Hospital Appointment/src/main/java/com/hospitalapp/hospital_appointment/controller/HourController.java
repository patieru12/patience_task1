package com.hospitalapp.hospital_appointment.controller;

import com.hospitalapp.hospital_appointment.model.Hour;
import com.hospitalapp.hospital_appointment.repository.HourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class HourController {
    @Autowired
    HourRepository hourRepository;

    @GetMapping("/hours")
    public ResponseEntity<List<Hour>> getAllHours(@RequestParam(required = false) String day){
        try{
            List<Hour> hours = new ArrayList<>();
            if(day == null){
                hours.addAll(hourRepository.findAll());
            } else {
                hours.addAll(hourRepository.findByDayContaining(day));
            }

            if(hours.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(hours, HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/hours/{id}")
    public ResponseEntity<Hour> getHourById(@PathVariable("id") long id){
        Optional<Hour> hourData = hourRepository.findById(id);

        if(hourData.isPresent()){
            return new ResponseEntity<>(hourData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value="/hours", consumes = {"application/json"})
    public ResponseEntity<Hour> createHour(@RequestBody Hour hour){
        try{
            Hour _hour = hourRepository
                    .save(new Hour(hour.getDay(), hour.getStartHour(), hour.getEndHour()));

            return new ResponseEntity<>(_hour, HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/hours/{id}")
    public ResponseEntity<Hour> updateHour(@PathVariable("id") long id, @RequestBody Hour hour){
        Optional<Hour> hourData = hourRepository.findById(id);
        if(hourData.isPresent()){
            Hour _hour = hourData.get();

            _hour.setDay(hour.getDay());
            _hour.setStartHour(hour.getStartHour());
            _hour.setEndHour(hour.getEndHour());

            return new ResponseEntity<>(hourRepository.save(_hour), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/hours/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") long id){
        try{
            hourRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
