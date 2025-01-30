import { useEffect, useState, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import '../../../../../../../public/styles/components/home/post/new/index.scss';
import { UserType } from '../../../../../types/user.type';
import axios from 'axios';
import server from '../../../../../../../server';
import DisplaySingle from '../../../../utils/categories/display-single';
import NaflowsButton from '../../../../../../../@components/button';
import ProfileHome from '../../profile/profile-home';
import WarningBeforePost from './warning-before-post';

interface NewPostProps {
    user: UserType | null;
}

function NewPost({ user }: NewPostProps) {
    const [categories, setCategories] = useState<{ id: string; name: string; color: string; }[]>([]);
    const [chosenCategory, setChosenCategory] = useState<{ id: string; name: string; color: string; } | null>(null);
    const [displayPicker, setDisplayPicker] = useState<boolean>(false);
    const [editorContent, setEditorContent] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const editorRef = useRef<EditorJS | null>(null);
    const pickerRef = useRef<HTMLDivElement | null>(null);
    const [displayAlert, setDisplayAlert] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${server.address}/get/categories`).then((res) => {
            setCategories(res.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editor-js",
                tools: {
                    header: Header,
                    list: List,
                },
                data: { blocks: [] }, // Load existing data
            });
        }
    }, []);



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setDisplayPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [pickerRef]);

    return (
        <div className="home-page">
            {displayAlert && (
                <WarningBeforePost
                    editorContent={editorContent}
                    categoryID={parseInt(chosenCategory?.id || '')}
                    title={title}
                    user={user}
                    setDisplayAlert={setDisplayAlert}
                />
            )}
            <div className="home-page-header">
                <ProfileHome user={user} />
            </div>
            <div className="post-edition">
                <div className="new-post">
                    <div className="new-post-edit">
                        <div className="new-post-field header">
                            <input type="text" placeholder="Titre" style={{
                                width: '100%'
                            }} onInput={() => {
                                setTitle(document.querySelector('.new-post-field.header input')?.value || '');
                            }} />
                            <div ref={pickerRef} className={`categories-picker ${displayPicker ? "display" : ""}`}>
                                <NaflowsButton
                                    content={[chosenCategory ? chosenCategory.name : "Catégories"]}
                                    onUserClick={() => {
                                        setDisplayPicker(!displayPicker);
                                    }}
                                    type="tertiary"
                                    style={{
                                        backgroundColor: chosenCategory ? chosenCategory.color : "",
                                        color : chosenCategory ? "white" : "black",
                                        borderColor: chosenCategory ? chosenCategory.color : ""
                                    }}
                                />
                                <div className="choices">
                                    {categories.map((category) => (
                                        <div key={category.id} onClick={() => {
                                            setChosenCategory(category);
                                        }}>
                                            <DisplaySingle category={category} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="new-post-field">
                            <div id="editor-js"></div>
                        </div>
                    </div>
                </div>
                <div className="post-actions">
                    <NaflowsButton
                        content={["Poster"]}
                        onUserClick={() => {
                            editorRef.current?.save().then((outputData) => {
                                setEditorContent(outputData);
                                const title = document.querySelector('.new-post-field.header input')?.value;
                                setTitle(title || '');
                                if (chosenCategory && title && outputData.blocks.length > 0) {
                                    setDisplayAlert(true);
                                }
                            });
                        }}
                        type={`primary ${!chosenCategory || !title ||(editorContent && editorContent.blocks.length < 0) ? "disabled" : ""}`}
                        style={{}}
                    />
                    <NaflowsButton
                        content={["Prévisualiser"]}
                        onUserClick={() => {
                            editorRef.current?.save().then((outputData) => {
                                console.log(outputData);
                            });
                        }}
                        type="secondary"
                        style={{}}
                    />
                </div>
            </div>
            <div className="post-informations">
                Tout ce que vous écrivez est public. Veuillez respecter les règles de la communauté.
                <br/>
                Si votre post ne respecte pas les règles, il sera supprimé.
                <br/>
                Lorsque vous postez du contenu, les autres utilisateurs peuvent le voir et le commenter,
                et se marquer comme intéressés. Vous serez en mesure de les contacter via leurs 
                adresses email universitaires, ou via les réseaux sociaux s'ils les ont renseignés.
            </div>
        </div>
    );
}

export default NewPost;