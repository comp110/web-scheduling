package comp110;

import static java.lang.System.out;

import java.io.IOException;
import java.io.PrintWriter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.javafx.binding.StringFormatter;

public class KarenBot {

  private SchedulingAlgo _algo;

  public KarenBot(SchedulingAlgo algo) {
    _algo = algo;
  }

  public void run(String scenario, int trials) {
    this.run(scenario, trials, false);
  }

  public String run(String scenario, int trials, boolean verbose) {
    SchedulingAlgo algo = _algo;

    // Load Data
    Week week;
    Staff staff;

    try {
      week = DataIO.parseWeek("data/week.json", scenario);
      staff = DataIO.parseStaff("data/staff.json", scenario);
    } catch (IOException e) {
      e.printStackTrace();
      System.exit(1);
      return "failed";
    }

    // Verify everyone has at least 20 available shifts for scheduling
    verifyHours(staff, week);

    // Run Algorithm for N trials and score it
    Scorer scorer = new Scorer(staff, week, algo);
    RunReport report = scorer.runWithReport(trials, verbose);

    // Output Results
    output(report);

    // Convert KarenBot output to JSON
    Scorecard scorecard = report.getHigh();
    Week schedule = scorecard.getSchedule().getWeek();
    JSONArray json = schedule.toJSON(scenario);

    // Write JSON to karenbot.json
    /*try {
        PrintWriter writer = new PrintWriter("data/karenbot.json", "UTF-8");
        writer.println(json.toString());
        writer.close();
    } catch (Exception e) {
    	System.out.println("ERROR: Failed to write to karenbot.json");
    }*/
    return json.toString();
  }

  private void verifyHours(Staff staff, Week week) {
    for (Employee e : staff) {
      int employeeHoursAvailability = 0;
      for (int day = 0; day < e.getAvailability().length; day++) {
        for (int hour = 0; hour < e.getAvailability()[0].length; hour++) {
          if (e.isAvailable(day, hour) && week.getShift(day, hour).getCapacity() > 0) {
            employeeHoursAvailability++;
          }
        }
      }
      if (employeeHoursAvailability < 20) {
        System.out.println(e.getName() + " only has " + employeeHoursAvailability + " available for scheduling (" + e.getCapacity() + ")");
      }
    }

  }

  private static void output(RunReport report) {
    Scorecard scorecard = report.getHigh();
    log("Diagnostics", scorecard.getDiagnostics());
    log("Schedule", scorecard.getSchedule().getWeek());
    String score = StringFormatter.format("%.3f - Highest Score", scorecard.getScore()).get();
    log(score, scorecard);
    log("Stats (n:" + report.getTrials() + ")", report.getStats());
  }

  private static void log(String header, Object body) {
    out.println("======================");
    out.println(header);
    out.println("======================");

    	  out.println(body);

    	//  jsonSchedule( body.toString());

  }
public static void  jsonSchedule(String body ){
	String[] words = body.split("\\W+");

	int daysOfWeek = 7;
 	JSONObject object = new JSONObject();
	for(int i =0 ; i < daysOfWeek ; i++){
		for ( String ss : words) {
			System.out.println(ss);
			if(ss.equals("Monday") || ss.equals("Tuesday")||ss.equals("Wednesday")||ss.equals("Thursday")||ss.equals("Friday")||ss.equals("Saturday")||ss.equals("Sunday")){
				System.out.println("hello");
				try {
					object.put("Day", ss);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		  }
	}





    System.out.print(object);
}
  public void runForKaren(String scenario, int day, int hour) {
    SchedulingAlgo algo = _algo;

    // Load Data
    Week week;
    Staff staff;

    try {
      week = DataIO.parseWeek("data/json/week.json", scenario);
      staff = DataIO.parseStaff("data/json/staff.json", scenario);
    } catch (IOException e) {
      e.printStackTrace();
      System.exit(1);
      return;
    }

    // Run Algorithm for N trials and score it
    getWhoIsAvailable(staff, day, hour);
  }

  public void getWhoIsAvailable(Staff staff, int day, int hour) {
    System.out.println("Day: " + day + " Hour: " + hour);
    for (Employee e : staff) {
      if (e.isAvailable(day, hour)) {
        System.out.println(e.getName());
      }
    }
  }
}