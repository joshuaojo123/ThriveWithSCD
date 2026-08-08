"use client";

import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}

export default function CommunityPage() {
  const { hydrated, user } = useAuth();
  const {
    posts,
    profiles,
    addPost,
    togglePostLike,
    addComment,
    addReply,
    toggleCommentLike,
    toggleReplyLike,
    sendMentorshipRequest,
    deletePost,
    followUser,
    unfollowUser,
  } = useCommunity();

  const [postDraft, setPostDraft] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [mentorMessage, setMentorMessage] = useState("");

  const mentors = useMemo(
    () => profiles.filter((profile) => profile.role === "Mentor" || profile.role === "Healthcare Professional"),
    [profiles],
  );

  if (!hydrated) {
    return null;
  }

  const handleAddPost = () => {
    if (!user) {
      return;
    }
    if (!postDraft.trim()) {
      return;
    }

    addPost(postDraft.trim());
    setPostDraft("");
  };

  const handleAddComment = (postId: string) => {
    const content = commentDrafts[postId]?.trim();
    if (!content || !user) return;
    addComment(postId, content);
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const handleAddReply = (postId: string, commentId: string) => {
    const key = `${postId}:${commentId}`;
    const content = replyDrafts[key]?.trim();
    if (!content || !user) return;
    addReply(postId, commentId, content);
    setReplyDrafts((current) => ({ ...current, [key]: "" }));
  };

  const handleMentorRequest = (mentorId: string) => {
    if (!mentorMessage.trim() || !user) return;
    sendMentorshipRequest(mentorId, mentorMessage.trim());
    setMentorMessage("");
  };

  return (
    <SiteShell title="Community" description="Connect with members, mentors, and healthcare professionals.">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Create post</p>
            <textarea
              value={postDraft}
              onChange={(event) => setPostDraft(event.target.value)}
              rows={4}
              className="input-field mt-4"
              placeholder={user ? "Share an update, question, or experience..." : "Sign in to share your story."}
              disabled={!user}
            />
            <button
              type="button"
              onClick={handleAddPost}
              disabled={!user || !postDraft.trim()}
              className="btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Publish post
            </button>
            {!user ? (
              <p className="mt-4 text-sm text-slate-400">Please sign in to participate in the community.</p>
            ) : null}
          </div>

          {posts.map((post) => {
            const author = profiles.find((profile) => profile.id === post.authorId);
            const authorId = author?.id;
            const isFollowing = user && author ? author.followers?.includes(user.id) ?? false : false;
            return (
              <article key={post.id} className="surface-card p-6">
                <div className="flex items-start gap-4">
                  <img src={author?.avatar || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"} alt={author?.name || "Author"} className="h-14 w-14 rounded-full object-cover" />
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">{author?.name || "Community member"}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{author?.role || "Member"}</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{formatDate(post.createdAt)}</p>
                    </div>
                    <div>
                      {user && author && user.id !== author.id ? (
                        isFollowing ? (
                          <button
                            type="button"
                            onClick={() => authorId && unfollowUser(authorId)}
                            className="btn-muted px-3 py-1 text-xs"
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => authorId && followUser(authorId)}
                            className="btn-primary px-3 py-1 text-xs"
                          >
                            Follow
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-base leading-7 text-slate-200">{post.content}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <button
                    type="button"
                    onClick={() => togglePostLike(post.id)}
                    className="btn-muted px-4 py-2 text-sm"
                  >
                    {post.likes.includes(user?.id || "") ? "Unlike" : "Like"} ({post.likes.length})
                  </button>
                  <span>{post.comments.length} comments</span>
                  {(user?.id === post.authorId || user?.role === "admin") && (
                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="rounded-full border border-red-600 bg-[#2b0a0e] px-4 py-2 text-sm text-red-300 transition hover:bg-[#3b0f13]"
                    >
                      Delete post
                    </button>
                  )}
                </div>

                <div className="mt-6 space-y-5">
                  {post.comments.map((comment) => {
                    const commentAuthor = profiles.find((profile) => profile.id === comment.authorId);
                    return (
                      <div key={comment.id} className="surface-panel p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-800" />
                          <div>
                            <p className="text-sm font-semibold text-white">{commentAuthor?.name || "Community member"}</p>
                            <p className="text-xs text-slate-500">{formatDate(comment.createdAt)}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{comment.content}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <button
                            type="button"
                            onClick={() => toggleCommentLike(post.id, comment.id)}
                            className="btn-muted px-3 py-1 text-sm"
                          >
                            {comment.likes.includes(user?.id || "") ? "Unlike" : "Like"} ({comment.likes.length})
                          </button>
                        </div>

                        <div className="mt-4 space-y-4">
                          {comment.replies.map((reply) => {
                            const replyAuthor = profiles.find((profile) => profile.id === reply.authorId);
                            return (
                              <div key={reply.id} className="surface-panel p-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-slate-800" />
                                  <div>
                                    <p className="text-sm font-semibold text-white">{replyAuthor?.name || "Community member"}</p>
                                    <p className="text-xs text-slate-500">{formatDate(reply.createdAt)}</p>
                                  </div>
                                </div>
                                <p className="mt-3 text-sm text-slate-300">{reply.content}</p>
                                <button
                                  type="button"
                                  onClick={() => toggleReplyLike(post.id, comment.id, reply.id)}
                                  className="btn-muted mt-3 px-3 py-1 text-sm"
                                >
                                  {reply.likes.includes(user?.id || "") ? "Unlike" : "Like"} ({reply.likes.length})
                                </button>
                              </div>
                            );
                          })}

                          <div className="surface-panel space-y-3 p-4">
                            <textarea
                              value={replyDrafts[`${post.id}:${comment.id}`] || ""}
                              onChange={(event) =>
                                setReplyDrafts((current) => ({
                                  ...current,
                                  [`${post.id}:${comment.id}`]: event.target.value,
                                }))
                              }
                              rows={2}
                              className="input-field w-full"
                              placeholder={user ? "Write a reply..." : "Sign in to reply."}
                              disabled={!user}
                            />
                            <button
                              type="button"
                              onClick={() => handleAddReply(post.id, comment.id)}
                              disabled={!user || !replyDrafts[`${post.id}:${comment.id}`]?.trim()}
                              className="btn-primary"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="surface-panel mt-6 p-4">
                  <textarea
                    value={commentDrafts[post.id] || ""}
                    onChange={(event) =>
                      setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))
                    }
                    rows={2}
                    className="input-field w-full"
                    placeholder={user ? "Add a comment..." : "Sign in to comment."}
                    disabled={!user}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    disabled={!user || !commentDrafts[post.id]?.trim()}
                    className="btn-primary mt-3"
                  >
                    Comment
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Mentorship</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">Reach out to trusted mentors and professionals for guidance.</p>
            <textarea
              value={mentorMessage}
              onChange={(event) => setMentorMessage(event.target.value)}
              rows={3}
              className="input-field mt-4"
              placeholder={user ? "Introduce yourself and ask a mentor for advice..." : "Sign in to request mentorship."}
              disabled={!user}
            />
            <div className="mt-4 space-y-3">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="surface-panel p-4">
                  <div className="flex items-center gap-3">
                    <img src={mentor.avatar} alt={mentor.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-white">{mentor.name}</p>
                      <p className="text-sm text-slate-400">{mentor.headline}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleMentorRequest(mentor.id)}
                    disabled={!user || !mentorMessage.trim()}
                    className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Request mentorship
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Quick guide</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>Post updates and ask questions.</li>
              <li>Like comments to show support.</li>
              <li>Reply to build deeper conversations.</li>
              <li>Use mentorship for 1-on-1 support.</li>
            </ul>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
