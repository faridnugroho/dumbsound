import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
// import thumbs from "../assets/data/thumbnail";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link } from "react-router-dom";

const AllMusic = () => {
  // fetching data musics
  let { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    return response.data.data;
  });
  console.log("ini data musics", musics);
  return (
    <div
      style={{
        backgroundColor: "#161616",
        paddingTop: "8rem",
        paddingBottom: "5rem",
      }}
    >
      <Container>
        <Row lg={5} md={4} sm={2} className="g-3">
          {musics?.map((item, index) => {
            return (
              <Col key={index}>
                <Link className="text-decoration-none" to={`/music/` + item.id}>
                  <Card className="bg-dark h-100 p-3">
                    <div className="d-flex h-100 justify-content-center">
                      <Card.Img
                        variant="top"
                        src={item.thumbnail}
                        className="rounded"
                      />
                    </div>
                    <Card.Body className="p-0 mt-3">
                      <div className="d-flex justify-content-between">
                        <Card.Title className="text-white">
                          {item.title}
                        </Card.Title>
                        <Card.Text className="text-white">
                          {item.year}
                        </Card.Text>
                      </div>
                      <Card.Text className="text-secondary">
                        {item.artist.name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default AllMusic;
