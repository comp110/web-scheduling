package comp110;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.json.JSONArray;

public class Shift extends HashSet<Employee> {

  /* Even though we don't serialize, this keeps Java from complaining... */
  private static final long serialVersionUID = 5723878473617645106L;

  private int _day;
  private int _hour;
  private int _capacity;

  public Shift(int day, int hour, int capacity) {
    _day = day;
    _hour = hour;
    _capacity = capacity;
  }

  public boolean add(Employee e) {
    boolean added = super.add(e);
    if (added) {
      e.setCapacityUsed(e.getCapacityUsed() + 1);
    }
    return added;
  }

  public boolean remove(Employee e) {
    boolean removed = super.remove(e);
    if (removed) {
      e.setCapacityUsed(e.getCapacityUsed() - 1);
    }
    return removed;
  }

  public String toString() {
    List<String> names = this.stream().map(e -> e.getName()).collect(Collectors.toList());
    return String.format("%02d", _hour) + ": " + String.join(", ", names);
  }

  public JSONArray toJSON(String weekStartDate) {
	  JSONArray json = new JSONArray();
	  ArrayList<String> days = new ArrayList<>(Arrays.asList("Sun", "Mon", "Tue", "Wed", "Thu", "Fri"));
	  Iterator<Employee> employees = super.iterator();
	  while (employees.hasNext()) {
      Employee e = employees.next();
      JSONObject shift = new JSONObject();
		  shift.put("weekStartDate", weekStartDate);
		  shift.put("day", days.get(_day));
		  shift.put("name", e.getName());
		  shift.put("start", _hour);
		  shift.put("end", _hour + 1);
      json.put(shift);
	  }

	  return json;
  }

  public boolean equals(Shift other) {
    boolean equals = _day == other._day;
    equals = equals && _hour == other._hour;
    equals = equals && _capacity == other._capacity;

    if (equals) {
      // This is literal vomit. Someone please figure out and teach me why Set's
      // containsAll method fails here. This should be O(n) not O(n^2). Ugh.
      for (Employee e : this) {
        boolean contains = false;
        for (Employee o : other) {
          if (e.equals(o)) {
            contains = true;
            break;
          }
        }
        if (contains == false) {
          return false;
        }
      }
    }

    equals = equals && this.size() == other.size();
    return equals;
  }

  public int getDay() {
    return _day;
  }

  public void setDay(int day) {
    _day = day;
  }

  public int getHour() {
    return _hour;
  }

  public void setHour(int hour) {
    _hour = hour;
  }

  public int getCapacity() {
    return _capacity;
  }

  public int getCapacityRemaining() {
    return _capacity - size();
  }

  public Shift copy() {
    Shift copy = new Shift(_day, _hour, _capacity);
    Iterator<Employee> itr = this.iterator();
    while (itr.hasNext()) {
      copy.add(itr.next().copy());
    }
    return copy;
  }

}
