package comp110;

import org.json.JSONArray;
import org.json.JSONObject;

public class Week {

  private String _title;
  private Shift[][] _shifts;

  public Week(String title) {
    _title = title;
    _shifts = new Shift[7][24];
    for (int day = 0; day < _shifts.length; day++) {
      for (int hour = 0; hour < _shifts[day].length; hour++) {
        _shifts[day][hour] = new Shift(day, hour, 0);
      }
    }
  }

  public boolean equals(Week other) {
    boolean equals = _title.equals(other._title);
    if (equals) {
      for (int day = 0; day < _shifts.length; day++) {
        for (int hour = 0; hour < _shifts[day].length; hour++) {
          if (_shifts[day][hour].equals(other._shifts[day][hour]) == false) {
            return false;
          }
        }
      }
    }
    return equals;
  }

  public String getTitle() {
    return _title;
  }

  public void setTitle(String title) {
    _title = title;
  }

  public Shift[][] getShifts() {
    return _shifts;
  }

  public Shift getShift(int day, int hour) {
    return _shifts[day][hour];
  }

  public double getScheduledHours() {
    double hours = 0.0;
    for (Shift[] day : _shifts) {
      for (Shift shift : day) {
        hours += shift.size();
      }
    }
    return hours;
  }

  public int getNumberOfShifts() {
    int shifts = 0;
    for (Shift[] day : _shifts) {
      for (Shift shift : day) {
        if (shift.getCapacity() > 0) {
          shifts++;
        }
      }
    }
    return shifts;
  }

  public static String dayString(int day) {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      default:
        return "Saturday";
    }
  }

  public String toString() {
    StringBuilder sb = new StringBuilder();

    sb.append("** ");
    sb.append(_title);
    sb.append(" **\n");

    for (int day = 0; day < _shifts.length; day++) {
      sb.append(Week.dayString(day) + "\n");
      for (Shift shift : _shifts[day]) {
        if (shift.getCapacity() > 0) {
          sb.append("\t" +shift + "\n");
        }
      }
    }

    return sb.toString();
  }
  
  public JSONArray toJSON(String weekStartDate) {
	  JSONArray json = new JSONArray();
	  for (int day  = 0; day < _shifts.length; day++) {
		  for (Shift shift : _shifts[day]) {
			  if (shift.getCapacity() > 0) {
				  // Add shift
				  JSONObject shiftJSON = shift.toJSON(weekStartDate);
				  if (shiftJSON.length() > 0) {
					  json.put(shiftJSON);
					  System.out.println(shift.toJSON(weekStartDate));
				  }
			  }
		  }
	  }
	  
	  return json;
  }

  public Week copy() {
    Week copy = new Week(_title);
    Shift[][] shifts = new Shift[_shifts.length][_shifts[0].length];
    for (int day = 0; day < _shifts.length; day++) {
      for (int hour = 0; hour < _shifts[day].length; hour++) {
        shifts[day][hour] = _shifts[day][hour].copy();
      }
    }
    copy._shifts = shifts;
    return copy;
  }

  public String toCSV() {
    StringBuilder sb = new StringBuilder();
    for (int hour = 0; hour < _shifts[0].length; hour++) {
      sb.append(hour + ",");
      for (int day = 0; day < _shifts.length; day++) {
        if (_shifts[day][hour].getCapacity() > 0) {
          sb.append("1,");
        } else {
          sb.append("0,");
        }
      }
      sb.append("\n");
    }
    return sb.toString();
  }
}