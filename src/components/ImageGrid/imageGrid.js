import React, { useState } from 'react';
import { Image, Paper, Flex, Button, Text, Grid, Col, Container, Center } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';

const ImageGrid = () => {
  const initialData = {
    "img150.jpg": 0.6409636024847725,
    "img151.jpg": 0.6593876998126189,
    "img152.jpg": 0.9821281375296768,
    "img153.jpg": 0.11870853858360075,
    "img154.jpg": 0.019336464310487966,
    "img155.jpg": 0.2981020252383647,
    "img156.jpg": 0.5576633667389299,
    "img157.jpg": 0.16541783921156827,
    "img158.jpg": 0.44235764566750047,
    "img159.jpg": 0.3052095897726037,
    "img300.jpg": 0.3879678110324418,
    "img301.jpg": 0.9023780984841167,
    "img302.jpg": 0.9328787950728632,
    "img303.jpg": 0.8684996386962929,
    "img304.jpg": 0.8067862622873416,
    "img305.jpg": 0.3757347397415146,
    "img306.jpg": 0.3978552758556573,
    "img307.jpg": 0.8954096920610539,
    "img308.jpg": 0.6185174821693596,
    "img309.jpg": 0.9128931981648296
  }


  const imagesWithScores = Object.entries(initialData).map(([filename, score]) => ({
    src: `${filename}`,
    score,
  }));


  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImage = (imageUrl) => {
    const isSelected = selectedImages.includes(imageUrl);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };
  const calculateSelectedImagesAverage = () => {
    const selectedImageScores = imagesWithScores.filter((image) => selectedImages.includes(image.src));

    if (selectedImageScores.length === 0) {
      return 0; // Return 0 if no selected images
    }

    const totalScore = selectedImageScores.reduce((sum, image) => sum + image.score, 0);
    return totalScore / selectedImageScores.length;
  };
  const calculateUnselectedImagesAverage = () => {
    const unselectedImages = imagesWithScores.filter((image) => !selectedImages.includes(image.src));

    if (unselectedImages.length === 0) {
      return 0; // Return 0 if no unselected images
    }

    const totalScore = unselectedImages.reduce((sum, image) => sum + image.score, 0);
    return totalScore / unselectedImages.length;
  };

  const selectedImagesAverage = calculateSelectedImagesAverage();
  const unselectedImagesAverage = calculateUnselectedImagesAverage();
  const difference = selectedImagesAverage - unselectedImagesAverage;


  const isImageSelected = (imageUrl) => selectedImages.includes(imageUrl);




  return (
    <Paper padding="xs" shadow="xs" className="captcha-container" >
      <Flex justify={'center'}><h2>Select and De-select Images to reflect the updated metric</h2></Flex>
      <Container >
        <Flex align={Center} justify={'center'}>
          <Grid gutter="xs" w={640}>
            {imagesWithScores.map((image, index) => (
              <Col key={image.src} span={3}>
                <Button
                  variant="subtle"
                  onClick={() => toggleImage(image.src)}
                  rightIcon={isImageSelected(image.src) && <IconCircleCheckFilled size={30} style={{ position: 'absolute', bottom: '-12px', right: '-20px', color: '#339AF0', padding: 0, border: 'none', background: 'transparent' }} />}
                  styles={(theme) => ({
                    root: {
                      backgroundColor: '#00acee',
                      border: 0,
                      height: 100,
                      paddingLeft: 0,
                      paddingRight: 0
                    }
                  })}
                >
                  <Image fit="contain" src={require(`./images/${image.src}`)} alt="Captcha Image" width={120} height={120} />
                </Button>
              </Col>
            ))}
          </Grid>
        </Flex>
      </Container>
      
      <Text align="center" size="xl">
        Metric: {difference.toFixed(2)}
      </Text>
     
    </Paper>
  );
};
export default ImageGrid;
