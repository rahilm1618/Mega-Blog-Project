import React, { use } from 'react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import databaseservice from '../../appwrite/configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {
    const navigate = useNavigate();
    const { register, handleSubit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post ? post.title : '',
            slug: post ? post.slug : '',
            content: post ? post.content : '',
            status: post ? post.status : 'active',
        }
    });
    //check 
    const userData = useSelector((state) => state.user.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? databaseservice.uploadFile(data.image[0]) : null;
            if (file) {
                databaseservice.deleteFile(post.featuredImage);
            }
            const dbPost = await databaseservice.updatePost(post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                }
            )
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {
            const file = data.image[0] ? databaseservice.uploadFile(data.image[0]) : null;

            const dbPost = await databaseservice.createPost({
                ...data,
                userid: userData.$id,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d]+/g, '-')


        }
        else {
            return '';
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const slug = slugTransform(value.title);
                setValue('slug', slug, { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();// Cleanup the subscription on unmount
        //optimization to avoid unnecessary re-renders
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

    )
}

export default PostForm
