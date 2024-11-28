import { Container, Card, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Health Management System</h1>
          <p className="text-center mb-4">
            📋 Your Health, Simplified! Track, manage, and stay on top of your
            medical records with ease. 💙
          </p>
          <div className="d-flex">
            <Button variant="secondary" href="/track">
              Track Health Record
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
