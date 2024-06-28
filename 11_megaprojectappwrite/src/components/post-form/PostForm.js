import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/configure';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues,

    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)

    // if (!userData) {
    //     console.log("Error Detacted");
    //     return null
    // }

    const submit = async (data) => {
        try {
            let fileId;
            if (post) {
                console.log("hello");

                const file = data.image[0] ? service.uploadFile(data.image[0]) : null
                if (file) {
                    service.deleteFile(post.featuredImage)
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                })
                if (dbPost) {
                    navigate(`./post/${dbPost.$id}`)
                }
            } else {
                console.log("heloo");
                // const newData = await service.uploadFile(data.image[0]);
                // console.log("heloo");

                // if (newData) {
                //     const fileId = newData.$id
                //     data.featuredImage = fileId
                //     const dbPost = await service.createPost({
                //         ...data,
                //         userId: userData.$id
                //     })
                //     if (dbPost) {
                //         navigate(`./post/${dbPost.$id}`)
                //     }
                const newData = {
                    ...data,
                    featuredImage: fileId,
                    userId: userData.$id,
                };
                const dbPost = await service.createPost(newData);
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

        } catch (error) {
            console.log("error ,Something whent wrong");
        }

    }
    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string')
            return value
                .trim()
                .toLowerCase()
                // .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')

        return ''
    },[])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, setValue, slugTransform])



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
                    onChange={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
                radom
                <Input
                    label="Featured Image :"
                    type='file'
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                // {...register("image")}
                />
                random
                {/* // watch out after start */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
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
                <Button
                    type="submit" bgColor={post ? "bg-blue-500" : "bg-gray-800"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm;
