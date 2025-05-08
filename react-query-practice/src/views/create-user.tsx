import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Card, message, Space } from 'antd';

interface NewUser {
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

async function createUser(user: NewUser): Promise<NewUser & { id: number }> {
    const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default function CreateUserForm() {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: (newUser: NewUser) => {
            console.log('🚀 ~ CreateUserForm ~ newUser:', newUser)
            queryClient.invalidateQueries({ queryKey: ['users'] });
            message.success('User created successfully!');
            form.resetFields();
        },
        onError: (error) => {
            message.error('Failed to create user: ' + error.message);
        },
    });

    const handleSubmit = (values: NewUser) => {
        mutation.mutate(values);
    };

    return (
        <Card title="Create New User" style={{ width: '600px' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={mutation.isPending}
            >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Form.Item
                        label="Email"
                        name={['email']}
                        rules={[{ required: true, type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name={['username']}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name={['password']}
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Space direction="horizontal" size="middle">
                        <Form.Item
                            label="First Name"
                            name={['name', 'firstname']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name={['name', 'lastname']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Space>

                    <Space direction="horizontal" size="middle">
                        <Form.Item
                            label="City"
                            name={['address', 'city']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Street"
                            name={['address', 'street']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Space>

                    <Space direction="horizontal" size="middle">
                        <Form.Item
                            label="Street Number"
                            name={['address', 'number']}
                            rules={[{ required: true, type: 'number' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Zipcode"
                            name={['address', 'zipcode']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Space>

                    <Space direction="horizontal" size="middle">
                        <Form.Item
                            label="Latitude"
                            name={['address', 'geolocation', 'lat']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Longitude"
                            name={['address', 'geolocation', 'long']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Space>

                    <Form.Item
                        label="Phone"
                        name={['phone']}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                            Create User
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Card>
    );
}