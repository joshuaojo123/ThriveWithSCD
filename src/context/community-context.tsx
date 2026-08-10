"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth-context";

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  avatar: string;
  banner: string;
  website?: string;
  verified: boolean;
  followers: string[];
  following: string[];
  joinedAt: string;
};

export type Reply = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: string[];
};

export type Comment = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: string[];
  replies: Reply[];
};

export type PostMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  tags: string[];
  mentions: string[];
  postType: "text" | "image" | "video" | "educational" | "event";
  media?: PostMedia[];
  shareCount: number;
  bookmarkCount: number;
  viewCount: number;
};

export type MentorshipRequest = {
  id: string;
  requesterId: string;
  mentorId: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  read: boolean;
};

export type CommunityState = {
  profiles: UserProfile[];
  posts: Post[];
  mentorshipRequests: MentorshipRequest[];
  notifications: Notification[];
  messages: Message[];
};

type CommunityContextValue = CommunityState & {
  addPost: (content: string) => void;
  togglePostLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addReply: (postId: string, commentId: string, content: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
  toggleReplyLike: (postId: string, commentId: string, replyId: string) => void;
  sendMentorshipRequest: (mentorId: string, message: string) => void;
  followUser: (profileId: string) => void;
  unfollowUser: (profileId: string) => void;
  sendDirectMessage: (recipientId: string, content: string) => Promise<void>;
  broadcastNotification: (title: string, body: string) => void;
  verifyProfile: (profileId: string, verified: boolean) => void;
  deletePost: (postId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  markNotificationRead: (notificationId: string) => void;
};

const CommunityContext = createContext<CommunityContextValue | undefined>(undefined);

const STORAGE_KEY = "thrive-community-state-v1";

const defaultProfiles: UserProfile[] = [
  {
    id: "ai",
    username: "thriveai",
    name: "ThriveAI",
    email: "assistant@thrivewithscd.local",
    role: "AI Assistant",
    headline: "Your intelligent Thrive companion.",
    bio: "ThriveAI helps answer questions, summarize research, and guide you through the platform.",
    location: "Cloud",
    avatar: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=256&q=80",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    website: undefined,
    verified: true,
    followers: [],
    following: [],
    joinedAt: new Date().toISOString(),
  },
  {
    id: "user-1",
    username: "amina.j",
    name: "Amina Johnson",
    email: "amina.johnson@example.com",
    role: "Community Member",
    headline: "Living with SCD and sharing lived experience.",
    bio: "Advocate, mentor, and content creator focused on wellness and resilience.",
    location: "Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
    banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    website: "https://thrivewithscd.org/amina",
    verified: true,
    followers: ["user-2"],
    following: ["user-3"],
    joinedAt: "2025-04-12T10:00:00.000Z",
  },
  {
    id: "user-2",
    username: "dr.kofi",
    name: "Dr. Kofi Mensah",
    email: "kofi.mensah@example.com",
    role: "Healthcare Professional",
    headline: "Hematologist and clinical researcher.",
    bio: "Supporting patients with evidence-based care and compassionate guidance.",
    location: "Accra, Ghana",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    banner: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1400&q=80",
    website: "https://thrivewithscd.org/dr-kofi",
    verified: true,
    followers: ["user-1","user-3"],
    following: [],
    joinedAt: "2024-11-20T12:30:00.000Z",
  },
  {
    id: "user-3",
    username: "noor.ali",
    name: "Noor Ali",
    email: "noor.ali@example.com",
    role: "Mentor",
    headline: "Peer mentor for youth living with SCD.",
    bio: "I help connect people with trusted resources and emotional support.",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    banner: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80",
    verified: false,
    followers: [],
    following: ["user-1"],
    joinedAt: "2025-02-08T09:15:00.000Z",
  },
];

const defaultPosts: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    content: "I started a new self-care routine this week and it has helped reduce my flare frequency. What strategies are working for you?",
    createdAt: "2026-08-02T08:24:00.000Z",
    likes: ["user-2"],
    tags: ["self-care", "support"],
    mentions: [],
    comments: [
      {
        id: "comment-1",
        authorId: "user-2",
        content: "This is powerful, Amina. I recommend staying hydrated and tracking symptom patterns.",
        createdAt: "2026-08-02T09:12:00.000Z",
        likes: ["user-1"],
        replies: [
          {
            id: "reply-1",
            authorId: "user-3",
            content: "I also use warm compresses and guided breathing during pain days.",
            createdAt: "2026-08-02T10:05:00.000Z",
            likes: [],
          },
        ],
      },
    ],
    postType: "text",
    shareCount: 18,
    bookmarkCount: 5,
    viewCount: 450,
  },
  {
    id: "post-2",
    authorId: "user-3",
    content: "Looking for a mentor who can help me navigate college with SCD. Happy to connect with others who have experience.",
    createdAt: "2026-08-01T14:50:00.000Z",
    likes: [],
    tags: ["mentorship", "education"],
    mentions: [],
    comments: [],
    postType: "educational",
    shareCount: 4,
    bookmarkCount: 2,
    viewCount: 182,
  },
];

const defaultMessages: Message[] = [
  {
    id: "message-ai-1",
    senderId: "ai",
    recipientId: "user-1",
    content: "Hi Amina, I’m ThriveAI. Tag me in a post with @ThriveAI or send me a direct message to get smart support on research, pain management, and community resources.",
    createdAt: "2026-08-02T11:00:00.000Z",
    read: false,
  },
  {
    id: "message-1",
    senderId: "user-2",
    recipientId: "user-1",
    content: "Hi Amina, I saw your post and wanted to share a few care tips.",
    createdAt: "2026-08-02T10:20:00.000Z",
    read: false,
  },
  {
    id: "message-2",
    senderId: "user-1",
    recipientId: "user-2",
    content: "Thank you, Dr. Kofi. That is very helpful.",
    createdAt: "2026-08-02T10:30:00.000Z",
    read: false,
  },
];

const defaultNotifications: Notification[] = [
  {
    id: "note-1",
    userId: "user-1",
    title: "New comment on your post",
    body: "Dr. Kofi commented on your self-care discussion.",
    createdAt: "2026-08-02T09:13:00.000Z",
    read: false,
  },
  {
    id: "note-2",
    userId: "user-3",
    title: "Mentorship request received",
    body: "A new mentorship request is ready for your review.",
    createdAt: "2026-08-02T08:50:00.000Z",
    read: false,
  },
];

function createNotification(userId: string, title: string, body: string): Notification {
  return {
    id: crypto.randomUUID(),
    userId,
    title,
    body,
    createdAt: new Date().toISOString(),
    read: false,
  };
}

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<CommunityState>({
    profiles: defaultProfiles,
    posts: defaultPosts,
    mentorshipRequests: [],
    notifications: defaultNotifications,
    messages: defaultMessages,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore invalid saved data
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  useEffect(() => {
    if (!hydrated || !user) {
      return;
    }

    setState((current) => {
      const existing = current.profiles.find((profile) => profile.id === user.id);
      if (existing) {
        if (existing.name !== user.name || existing.email !== user.email) {
          return {
            ...current,
            profiles: current.profiles.map((profile) =>
              profile.id === user.id ? { ...profile, name: user.name, email: user.email } : profile,
            ),
          };
        }
        return current;
      }

      const username = user.email.split("@")[0].replace(/[._-]/g, " ").toLowerCase();
      const nextProfile: UserProfile = {
        id: user.id,
        username,
        name: user.name,
        email: user.email,
        role: user.role === "professional" ? "Healthcare Professional" : "Member",
        headline: "ThriveWithSCD community member.",
        bio: "A dedicated member of the ThriveWithSCD community.",
        location: "Global",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
        banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        website: undefined,
        verified: false,
        followers: [],
        following: [],
        joinedAt: new Date().toISOString(),
      };

      return {
        ...current,
        profiles: [nextProfile, ...current.profiles],
      };
    });
  }, [hydrated, user]);

  const addPost = (content: string) => {
    if (!user) {
      throw new Error("Sign in to publish posts.");
    }

    const mentions = content.match(/@\w+/g)?.map((mention) => mention.toLowerCase()) ?? [];
    const nextPost: Post = {
      id: crypto.randomUUID(),
      authorId: user.id,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      tags: [],
      mentions,
      postType: "text",
      media: [],
      shareCount: 0,
      bookmarkCount: 0,
      viewCount: 0,
    };

    setState((current) => ({
      ...current,
      posts: [nextPost, ...current.posts],
      notifications: [
        ...current.notifications,
        createNotification(user.id, "Post published", "Your community post is now live."),
      ],
    }));

    const aiMentioned = mentions.some((mention) => mention === "@thriveai" || mention === "@ai");
    if (!aiMentioned) {
      return;
    }

    void (async () => {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: content }),
        });
        const data = await response.json();

        const aiComment: Comment = {
          id: crypto.randomUUID(),
          authorId: "ai",
          content: data.reply || "ThriveAI is ready to help, but I couldn’t generate a response right now.",
          createdAt: new Date().toISOString(),
          likes: [],
          replies: [],
        };

        setState((current) => ({
          ...current,
          posts: current.posts.map((post) =>
            post.id === nextPost.id ? { ...post, comments: [...post.comments, aiComment] } : post,
          ),
          notifications: [
            ...current.notifications,
            createNotification(user.id, "ThriveAI replied", "Your tagged AI request received an answer."),
          ],
        }));
      } catch {
        const aiComment: Comment = {
          id: crypto.randomUUID(),
          authorId: "ai",
          content: "ThriveAI is unavailable right now. Please try again shortly.",
          createdAt: new Date().toISOString(),
          likes: [],
          replies: [],
        };
        setState((current) => ({
          ...current,
          posts: current.posts.map((post) =>
            post.id === nextPost.id ? { ...post, comments: [...post.comments, aiComment] } : post,
          ),
        }));
      }
    })();
  };

  const togglePostLike = (postId: string) => {
    if (!user) {
      throw new Error("Sign in to like posts.");
    }

    setState((current) => {
      const posts = current.posts.map((post) => {
        if (post.id !== postId) return post;
        const likes = post.likes.includes(user.id)
          ? post.likes.filter((id) => id !== user.id)
          : [...post.likes, user.id];
        return { ...post, likes };
      });

      const post = current.posts.find((candidate) => candidate.id === postId);
      const notifications = post && post.authorId !== user.id
        ? [
            ...current.notifications,
            createNotification(post.authorId, "Post liked", `${user.name} liked your post.`),
          ]
        : current.notifications;

      return { ...current, posts, notifications };
    });
  };

  const addComment = (postId: string, content: string) => {
    if (!user) {
      throw new Error("Sign in to comment.");
    }

    const nextComment: Comment = {
      id: crypto.randomUUID(),
      authorId: user.id,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
      replies: [],
    };

    setState((current) => {
      const posts = current.posts.map((post) => {
        if (post.id !== postId) return post;
        return { ...post, comments: [...post.comments, nextComment] };
      });

      const post = current.posts.find((candidate) => candidate.id === postId);
      const notifications = post && post.authorId !== user.id
        ? [
            ...current.notifications,
            createNotification(post.authorId, "New comment", `${user.name} commented on your post.`),
          ]
        : current.notifications;

      return { ...current, posts, notifications };
    });
  };

  const addReply = (postId: string, commentId: string, content: string) => {
    if (!user) {
      throw new Error("Sign in to reply.");
    }

    const nextReply: Reply = {
      id: crypto.randomUUID(),
      authorId: user.id,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
    };

    setState((current) => {
      const posts = current.posts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            return { ...comment, replies: [...comment.replies, nextReply] };
          }),
        };
      });

      const notifications = [
        ...current.notifications,
        createNotification(user.id, "Reply posted", "Your reply has been added."),
      ];

      return { ...current, posts, notifications };
    });
  };

  const toggleCommentLike = (postId: string, commentId: string) => {
    if (!user) {
      throw new Error("Sign in to like comments.");
    }

    setState((current) => {
      const posts = current.posts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const likes = comment.likes.includes(user.id)
              ? comment.likes.filter((id) => id !== user.id)
              : [...comment.likes, user.id];
            return { ...comment, likes };
          }),
        };
      });
      return { ...current, posts };
    });
  };

  const toggleReplyLike = (postId: string, commentId: string, replyId: string) => {
    if (!user) {
      throw new Error("Sign in to like replies.");
    }

    setState((current) => {
      const posts = current.posts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id !== replyId) return reply;
                const likes = reply.likes.includes(user.id)
                  ? reply.likes.filter((id) => id !== user.id)
                  : [...reply.likes, user.id];
                return { ...reply, likes };
              }),
            };
          }),
        };
      });
      return { ...current, posts };
    });
  };

  const sendMentorshipRequest = (mentorId: string, message: string) => {
    if (!user) {
      throw new Error("Sign in to request mentorship.");
    }

    const nextRequest: MentorshipRequest = {
      id: crypto.randomUUID(),
      requesterId: user.id,
      mentorId,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({
      ...current,
      mentorshipRequests: [nextRequest, ...current.mentorshipRequests],
      notifications: [
        ...current.notifications,
        createNotification(mentorId, "New mentorship request", `${user.name} wants to connect with you.`),
      ],
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error("Sign in to update your profile.");
    }

    setState((current) => ({
      ...current,
      profiles: current.profiles.map((profile) =>
        profile.id === user.id ? { ...profile, ...updates } : profile,
      ),
    }));
  };

  const followUser = (profileId: string) => {
    if (!user) {
      throw new Error("Sign in to follow users.");
    }

    setState((current) => ({
      ...current,
      profiles: current.profiles.map((profile) => {
        if (profile.id === user.id) {
          return profile.following.includes(profileId)
            ? profile
            : { ...profile, following: [...profile.following, profileId] };
        }

        if (profile.id === profileId) {
          return profile.followers.includes(user.id)
            ? profile
            : { ...profile, followers: [...profile.followers, user.id] };
        }

        return profile;
      }),
    }));
  };

  const unfollowUser = (profileId: string) => {
    if (!user) {
      throw new Error("Sign in to unfollow users.");
    }

    setState((current) => ({
      ...current,
      profiles: current.profiles.map((profile) => {
        if (profile.id === user.id) {
          return { ...profile, following: profile.following.filter((id) => id !== profileId) };
        }

        if (profile.id === profileId) {
          return { ...profile, followers: profile.followers.filter((id) => id !== user.id) };
        }

        return profile;
      }),
    }));
  };

  const sendDirectMessage = async (recipientId: string, content: string) => {
    if (!user) {
      throw new Error("Sign in to send messages.");
    }

    const nextMessage: Message = {
      id: crypto.randomUUID(),
      senderId: user.id,
      recipientId,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setState((current) => ({
      ...current,
      messages: [...current.messages, nextMessage],
      notifications: [
        ...current.notifications,
        createNotification(recipientId, "New message received", `${user.name} sent you a direct message.`),
      ],
    }));

    if (recipientId === "ai") {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: content }),
        });
        const data = await response.json();
        const aiReply: Message = {
          id: crypto.randomUUID(),
          senderId: "ai",
          recipientId: user.id,
          content: data.reply || "ThriveAI could not answer that right now.",
          createdAt: new Date().toISOString(),
          read: false,
        };

        setState((current) => ({
          ...current,
          messages: [...current.messages, aiReply],
          notifications: [
            ...current.notifications,
            createNotification(user.id, "ThriveAI replied", "Your AI assistant has answered your question."),
          ],
        }));
      } catch {
        const aiReply: Message = {
          id: crypto.randomUUID(),
          senderId: "ai",
          recipientId: user.id,
          content: "ThriveAI is unavailable right now. Please try again shortly.",
          createdAt: new Date().toISOString(),
          read: false,
        };
        setState((current) => ({
          ...current,
          messages: [...current.messages, aiReply],
        }));
      }
    }
  };

  const broadcastNotification = (title: string, body: string) => {
    setState((current) => ({
      ...current,
      notifications: [
        ...current.notifications,
        ...current.profiles.map((profile) => createNotification(profile.id, title, body)),
      ],
    }));
  };

  const verifyProfile = (profileId: string, verified: boolean) => {
    setState((current) => ({
      ...current,
      profiles: current.profiles.map((profile) =>
        profile.id === profileId ? { ...profile, verified } : profile,
      ),
    }));
  };

  const deletePost = (postId: string) => {
    setState((current) => ({
      ...current,
      posts: current.posts.filter((post) => post.id !== postId),
    }));
  };

  const markNotificationRead = (notificationId: string) => {
    setState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    }));
  };

  const value = useMemo(
    () => ({
      ...state,
      addPost,
      togglePostLike,
      addComment,
      addReply,
      toggleCommentLike,
      toggleReplyLike,
      sendMentorshipRequest,
      followUser,
      unfollowUser,
      sendDirectMessage,
      broadcastNotification,
      verifyProfile,
      deletePost,
      updateProfile,
      markNotificationRead,
    }),
    [state],
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within CommunityProvider");
  }
  return context;
}
