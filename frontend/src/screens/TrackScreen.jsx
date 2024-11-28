import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useTrackRecordMutation } from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";

const TrackScreen = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [trackRecord, { isLoading }] = useTrackRecordMutation();

  const validateForm = () => {
    const validationErrors = [];
    if (!patientName) validationErrors.push("Patient Name is required.");
    if (!age) validationErrors.push("Age is required.");
    if (!symptoms) validationErrors.push("Symptoms are required.");
    if (!diagnosis) validationErrors.push("Diagnosis is required.");
    if (!prescription) validationErrors.push("Prescription is required.");
    return validationErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
    } else {
      try {
        const res = await trackRecord({
          patientName,
          age,
          symptoms,
          diagnosis,
          prescription,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Record is tracked successfully!");
        navigate("/patientlist");
      } catch (err) {
        toast.error(
          err?.data?.message || err.error || "Failed to track record."
        );
      }
    }
  };

  return (
    <FormContainer>
      <h1>Track Health Record</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="patientName">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Patient Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="symptoms">
          <Form.Label>Symptoms</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="diagnosis">
          <Form.Label>Diagnosis</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="prescription">
          <Form.Label>Prescription</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Submit
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default TrackScreen;
