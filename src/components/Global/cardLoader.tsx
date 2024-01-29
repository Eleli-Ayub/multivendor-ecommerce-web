import { Row, Col, Card, Skeleton } from 'antd';

const AdCardSkeleton = () => {
    const skeletonContent = (
        <Skeleton loading={true} active avatar>
            {/* Image */}
            <Card.Meta
                avatar={<Skeleton.Avatar active size="large" />}
                title="Ad Title"
                description="Ad Description"
            />
        </Skeleton>
    );

    return (
        <Row gutter={[16, 16]}>
            {/* You can adjust the number of Col components based on the number of rows you want */}
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card style={{ width: '100%' }}>{skeletonContent}</Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card style={{ width: '100%' }}>{skeletonContent}</Card>
            </Col>
            {/* Add more Col components as needed */}
        </Row>
    );
};

export default AdCardSkeleton;
