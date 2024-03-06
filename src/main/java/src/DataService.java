package src;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import src.Common.GeneralFunctions;
import src.Master.*;
import src.Master.Models.Student;

@SpringBootApplication
@RestController
@RequestMapping("api/")
public class DataService {

	public static void main(String[] args) {
		SpringApplication.run(DataService.class, args);
	}

	@Autowired
	StudentService Student;
	
	@PostMapping("/getStudents")
	public List<Student> getStudents(@RequestBody Map<String, Object> requestData) throws SQLException {
		return Student.getStudents(requestData);
	}
	
	@PostMapping("/saveStudent")
	public Map<String, Object> saveStudent(@RequestBody Map<String, Object> requestData) throws SQLException {
		return Student.saveStudent(requestData);
	}
	
	@PostMapping("/deleteStudent")
	public Map<String, Object> deleteStudent(@RequestBody Integer requestData) throws SQLException {
		return Student.deleteStudent(requestData);
	}
	
	@GetMapping("/generateSecretKey")
	public String generateSecretKey() throws SQLException {
		return new GeneralFunctions().generateSecretKey(16);
	}
}
