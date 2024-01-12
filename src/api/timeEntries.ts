import * as z from 'zod';
import { ObjectId } from 'bson';
import axios from "axios";

export const TimeEntry = z.object({
  actorId: z.instanceof(ObjectId).or( z.string().transform( ObjectId.createFromHexString ) ),
  dateString: z.string(),
  activityId: z.instanceof(ObjectId).or( z.string().transform( ObjectId.createFromHexString ) ),
  duration: z.number().min(0.0).max(24.0),
  concentrationLevel: z.number().int().min(1).max(5)
});

export const TimeEntryWithId = TimeEntry.extend({
  _id: z.instanceof(ObjectId)
});

export type TimeEntry = z.infer<typeof TimeEntry>;
export type TimeEntryWithId = z.infer<typeof TimeEntryWithId>;

const defaultJsonOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
};

export const getTimeEntries = (
  onSuccess: (timeEntriesWithId: TimeEntryWithId[]) => void,
  onFailure: () => void
) => {
  axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/v1/timeEntries`,
    defaultJsonOptions
  )
    .then((response) => {
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        onFailure();
      }
    })
    .catch((error) => console.log(error));
};

export const getTimeEntriesByActorIdAndDates = (
  actorId: string,
  startDate: string,
  endDate: string,
  onSuccess: (timeEntriesWithId: TimeEntryWithId[]) => void,
  onFailure: () => void
) => {
  axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/v1/timeEntries?actorId=${actorId}&startDate=${startDate}&endDate=${endDate}`,
    defaultJsonOptions
  )
    .then((response) => {
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        onFailure();
      }
    })
    .catch((error) => console.log(error));
};

export const createTimeEntry = (
  timeEntry: TimeEntry,
  onSuccess: () => void,
  onFailure: () => void
) => {
  axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/v1/timeEntries`,
    timeEntry,
    defaultJsonOptions
  )
    .then((response) => {
      if (response.status === 201) {
        onSuccess();
      } else {
        onFailure();
      }
    })
    .catch((error) => console.log(error));
};