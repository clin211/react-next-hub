import { useQuery } from '@tanstack/react-query';
import { Card, Typography, Space, Spin, Alert } from 'antd';
import { Suspense } from 'react';

const { Title, Text } = Typography;

interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default function User({ userId }: { userId: number }) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    });

    if (isLoading) return <Spin size="large" />;
    if (error) return <Alert type="error" message={error.message} />;
    if (!data) return <Alert type="warning" message="No data available" />;

    return (
        <Suspense fallback={<Spin size="large" />}>
            <Card>
                <Space direction="vertical" size="large">
                    <Title level={2}>{data.name.firstname} {data.name.lastname}</Title>
                    <Space direction="vertical">
                        <Text><Text strong>Email:</Text> {data.email}</Text>
                        <Text><Text strong>Phone:</Text> {data.phone}</Text>
                        <Text><Text strong>Address:</Text> {data.address.street} {data.address.number}, {data.address.city}</Text>
                    </Space>
                </Space>
            </Card>
        </Suspense>
    );
}

