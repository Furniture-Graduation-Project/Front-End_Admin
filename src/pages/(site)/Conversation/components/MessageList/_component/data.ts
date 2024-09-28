import { IConversation } from "@/interface/message";
export const data : IConversation[] = [
    {
      _id: '60a9f0a2b4d8a37f9b034e5a',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5b',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5c',
            senderType: 'User',
            name: 'John Doe',
            avatar: 'https://example.com/avatar/johndoe.jpg'
          },
          content: 'Hello, I have a question regarding my order.',
          status: 'sent',
          timestamp: '2024-09-24T12:34:56.789Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5d',
            senderType: 'Employee',
            name: 'Customer Support',
            avatar: 'https://example.com/avatar/support.jpg'
          },
          content: 'Sure, how can I assist you?',
          status: 'received',
          timestamp: '2024-09-24T12:35:30.123Z'
        }
      ],
      star: false,
      label: 'service',
      status: 'normal',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id: '60a9f0a2b4d8a37f9b034e5f',
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Vefwefw'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },
    {
      _id: '60a9f0a2b4d8a37f9b034e5e',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e5f',
            senderType: 'User',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar/janesmith.jpg'
          },
          content: 'I would like to provide some feedback on your service.',
          status: 'sent',
          timestamp: '2024-09-23T10:15:20.123Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e60',
            senderType: 'Employee',
            name: 'Feedback Team',
            avatar: 'https://example.com/avatar/feedback.jpg'
          },
          content: 'Thank you for your feedback, we appreciate it!',
          status: 'received',
          timestamp: '2024-09-23T10:16:00.789Z'
        }
      ],
      star: true,
      label: 'feedback',
      status: 'important',
      category: 'inbox'
    },

    {
      _id: '60a9f0a2b4d8a37f9b034e61',
      userId: {
        _id : "8273h2h32rh29d23",
        name: 'Nguyen Van A'
      },
      messages: [
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e62',
            senderType: 'User',
            name: 'Emily Johnson',
            avatar: 'https://example.com/avatar/emilyjohnson.jpg'
          },
          content: 'Can I change my order before it ships?',
          status: 'read',
          timestamp: '2024-09-22T08:45:12.456Z'
        },
        {
          sender: {
            senderId: '60a9f0a2b4d8a37f9b034e63',
            senderType: 'Employee',
            name: 'Order Support',
            avatar: 'https://example.com/avatar/ordersupport.jpg'
          },
          content: 'Yes, please provide the new details.',
          status: 'read',
          timestamp: '2024-09-22T08:46:30.789Z'
        }
      ],
      star: false,
      label: 'order',
      status: 'normal',
      category: 'inbox'
    }
  ]