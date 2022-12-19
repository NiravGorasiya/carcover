import React from "react";
import FileUpload from "./FileUpload";
import {useDispatchArticle, useArticle} from "./ArticleContext";
import {Typography, Input} from "antd";
import TagSelector from "@/components/TagSelector";
import {Editor} from "@tinymce/tinymce-react";
import {useRef} from "react";
import CommonInput from "@/components/CommonInput";

const StepsOfArticle = ({validator}) => {
    const dispatch = useDispatchArticle();
    const _stepCount = useArticle((e) => e.stepCount);
    const _article = useArticle((e) => e.article);
    const _error = useArticle((e) => e.error);
    const tinyRef = useRef(null);
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (value.length <= 250) {
            dispatch({type: "UPDATE_ARTICLE", payload: {name, value}});
        }
    };
    const handleEditorChange = (value, editor) => {
        if (editor?.getContent({format: 'text'})?.trim()?.length < 150) {
            dispatch({
                type: "UPDATE_ARTICLE",
                payload: {name: "paragraph", value},
            });
        }
    };
    const handleTagChange = (tags) => {
        dispatch({
            type: "UPDATE_ARTICLE",
            payload: {name: "tags", value: tags},
        });
    };
    return (
        <React.Fragment>
            <CommonInput
                label={_stepCount === 0 ? "Add Title" : "Add Subtitle " + _stepCount}
                required={_stepCount === 0}
                hasError={_stepCount === 0 && validator?.current?.message("title", _article[_stepCount]?.title, "required")}>

                <Input
                    placeholder={_stepCount === 0 ? "Title of an article" : "Write Subtitle"}
                    name="title"
                    onChange={handleChange}
                    type="text"
                    value={_article[_stepCount]?.title || ""}
                    variant="outlined"
                />
            </CommonInput>
            <div>
                <FileUpload/>
            </div>
            <div>
                <Typography.Title level={4}>
                    {_stepCount === 0 ? "Add Overview:" : `Add Paragraph ${_stepCount}`}
                </Typography.Title>
            </div>
            <CommonInput label={'Write overview of an article...Maximum 250 words *'}
                         required={_stepCount < 3}
                         hasError={_stepCount < 3 && validator?.current?.message("Paragraph", _article[_stepCount]?.paragraph, "required|min:4")}>
            <Editor
                apiKey={'558g6bb9fhfu000ouk6syny4b8yn6xb8awmsbj1ntp8edcmb'}
                onInit={(event, editor) => (tinyRef.current = editor)}
                init={{
                    plugins: "link anchor, wordcount",
                    menubar: false,
                    nonbreaking_force_tab: true,
                    branding: false,
                    toolbar: "undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify" +
                        "| forecolor backcolor | bullist numlist",
                    elementpath: false,
                    content_style: 'body { font-family:Arial,sans-serif; font-size:18px; }'
                }}
                value={_article[_stepCount]?.paragraph || ""}
                onEditorChange={handleEditorChange}
            />
            </CommonInput>
            {/* <Input.TextArea
                placeholder={
                    _stepCount === 0
                        ? "Write an overview of an article"
                        : "Write paragraph"
                }
                rows={4}
                name="paragraph"
                value={_article[_stepCount]?.paragraph || ""}
                style={{width: "100%"}}
                onChange={handleChange}
            /> */}
            {_error[_stepCount]?.paragraph && (
                <p className="media-error">{_error[_stepCount]?.paragraph}</p>
            )}
            <div style={{margin: "10px 0 0"}}>
                <Typography.Text type="secondary" className="mb-15">
                    Maximum 5 tags allowed
                </Typography.Text>
            </div>
            <div className="mb-15">
                <TagSelector
                    value={_article[_stepCount].tags}
                    onChange={handleTagChange}
                />
            </div>
            <Typography.Text type="danger">
                {_error[_stepCount]?.tags}
            </Typography.Text>
        </React.Fragment>
    );
};

export default StepsOfArticle;
