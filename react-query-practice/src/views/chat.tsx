import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    Input,
    Button,
    List,
    Typography,
    Space,
    Tag,
    Avatar,
    message,
} from 'antd';
import {
    SendOutlined,
    UserOutlined,
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { useWebSocket, chatKeys } from '../hooks/useWebSocket';

const { Text, Title } = Typography;

export function Chat() {
    const [inputMessage, setInputMessage] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const { isConnected, username, sendMessage, updateUsername } = useWebSocket('ws://localhost:8080');

    // 使用 TanStack Query 获取消息
    const { data: messages = [] } = useQuery({
        queryKey: chatKeys.messages(),
        initialData: [],
    });

    // 使用 TanStack Query 获取系统消息
    const { data: systemMessages = [] } = useQuery({
        queryKey: chatKeys.users(),
        initialData: [],
    });

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleUpdateUsername = (e: React.FormEvent) => {
        e.preventDefault();
        if (newUsername.trim()) {
            updateUsername(newUsername);
            setNewUsername('');
            message.success('Username updated successfully!');
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <Card
                title={
                    <Space>
                        <Title level={4} style={{ margin: 0 }}>WebSocket Chat</Title>
                        <Tag color={isConnected ? 'success' : 'error'} icon={isConnected ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </Tag>
                    </Space>
                }
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {/* 用户名设置 */}
                    <Card size="small">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <form onSubmit={handleUpdateUsername} style={{ display: 'flex', gap: '8px' }}>
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter new username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    htmlType="submit"
                                >
                                    Update Username
                                </Button>
                            </form>
                            <Text type="secondary">Current username: {username}</Text>
                        </Space>
                    </Card>

                    {/* 消息列表 */}
                    <Card
                        bodyStyle={{ height: 400, overflow: 'auto', padding: '12px' }}
                        size="small"
                    >
                        <List
                            dataSource={[...systemMessages, ...messages]}
                            renderItem={(msg, index) => {
                                if ('type' in msg) {
                                    // 系统消息
                                    return (
                                        <List.Item>
                                            <Card size="small" style={{ width: '100%', backgroundColor: '#e6f7ff' }}>
                                                <Text type="secondary">
                                                    {msg.type === 'USER_JOINED' && (
                                                        <>{msg.data.username} joined the chat</>
                                                    )}
                                                    {msg.type === 'USER_LEFT' && (
                                                        <>{msg.data.username} left the chat</>
                                                    )}
                                                    {msg.type === 'USERNAME_CHANGED' && (
                                                        <>{msg.data.oldUsername} changed their name to {msg.data.newUsername}</>
                                                    )}
                                                    <Text type="secondary" style={{ float: 'right' }}>
                                                        {new Date(msg.data.timestamp).toLocaleTimeString()}
                                                    </Text>
                                                </Text>
                                            </Card>
                                        </List.Item>
                                    );
                                } else {
                                    // 聊天消息
                                    return (
                                        <List.Item>
                                            <Card size="small" style={{ width: '100%' }}>
                                                <Space direction="vertical" size={0} style={{ width: '100%' }}>
                                                    <Space>
                                                        <Avatar icon={<UserOutlined />} />
                                                        <Text strong>{msg.username}</Text>
                                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                                        </Text>
                                                    </Space>
                                                    <Text style={{ marginLeft: 40 }}>{msg.message}</Text>
                                                </Space>
                                            </Card>
                                        </List.Item>
                                    );
                                }
                            }}
                        />
                    </Card>

                    {/* 消息输入 */}
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                        <Input
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            disabled={!isConnected}
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            htmlType="submit"
                            disabled={!isConnected}
                        >
                            Send
                        </Button>
                    </form>
                </Space>
            </Card>
        </div>
    );
}
