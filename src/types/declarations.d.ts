declare module '@/app/_assets/posts.json' {
    import type { Post } from '../app/_utils/types';
    interface PostsJsonType {
        posts: Post[];
        daily: Post[];
        weekly: Post[];
        monthly: Post[];
        annual: Post[];
    }
    const value: PostsJsonType;
    export default value;
}
