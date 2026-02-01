import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or use Input
import { toast } from "sonner";

export default function AdminDashboard() {
    const [, setLocation] = useLocation();
    const utils = trpc.useContext();
    const { data: user } = trpc.auth.me.useQuery();
    const logoutMutation = trpc.auth.logout.useMutation({
        onSuccess: () => setLocation("/login"),
    });

    const { data: content } = trpc.cms.getContent.useQuery();
    const { data: photos } = trpc.cms.getPhotos.useQuery();

    const updateContentMutation = trpc.cms.updateContent.useMutation({
        onSuccess: () => {
            toast.success("Content updated!");
            utils.cms.getContent.invalidate();
        },
    });

    const addPhotoMutation = trpc.cms.addPhoto.useMutation({
        onSuccess: () => {
            toast.success("Photo added!");
            utils.cms.getPhotos.invalidate();
            setNewPhoto({ section: "gallery", src: "", alt: "", title: "", category: "" });
        },
    });

    const deletePhotoMutation = trpc.cms.deletePhoto.useMutation({
        onSuccess: () => {
            toast.success("Photo deleted");
            utils.cms.getPhotos.invalidate();
        },
    });

    // State for new photo form
    const [newPhoto, setNewPhoto] = useState({
        section: "gallery",
        src: "",
        alt: "",
        title: "",
        category: "",
    });

    const handleUpdateText = (key: string, section: string, value: string) => {
        updateContentMutation.mutate({ key, section, value });
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Welcome, {user?.name}</p>
                    </div>
                    <Button variant="outline" onClick={() => logoutMutation.mutate()}>
                        Logout
                    </Button>
                </div>

                <Tabs defaultValue="content" className="space-y-8">
                    <TabsList>
                        <TabsTrigger value="content">Text Content</TabsTrigger>
                        <TabsTrigger value="photos">Photos & Gallery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-8">
                        <div className="grid gap-6 max-w-2xl">
                            <div className="p-6 bg-card rounded-xl border space-y-4">
                                <h3 className="font-semibold text-lg">Hero Section</h3>
                                <div className="space-y-2">
                                    <Label>Main Title (First Line)</Label>
                                    <Input
                                        defaultValue={content?.["hero_title_1"] || "KAIQUE"}
                                        onBlur={(e) => handleUpdateText("hero_title_1", "hero", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Main Title (Second Line)</Label>
                                    <Input
                                        defaultValue={content?.["hero_title_2"] || "FONTINY"}
                                        onBlur={(e) => handleUpdateText("hero_title_2", "hero", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <textarea
                                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                        defaultValue={content?.["hero_subtitle"] || "Conceito, Direção e Comunicação — Um Universo de Ideias em Cena"}
                                        onBlur={(e) => handleUpdateText("hero_subtitle", "hero", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-card rounded-xl border space-y-4">
                                <h3 className="font-semibold text-lg">About Section</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div key={num} className="space-y-2">
                                            <Label>Paragraph {num}</Label>
                                            <Input
                                                defaultValue={content?.[`about_p${num}`] || ""}
                                                onBlur={(e) => handleUpdateText(`about_p${num}`, "about", e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <div className="space-y-2">
                                        <Label>Highlight Text</Label>
                                        <Input
                                            defaultValue={content?.["about_highlight"] || "PROPÓSITO, ESTÉTICA E ESTRATÉGIA."}
                                            onBlur={(e) => handleUpdateText("about_highlight", "about", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Education (Label)</Label>
                                            <Input
                                                defaultValue={content?.["about_edu_label"] || "Design Gráfico"}
                                                onBlur={(e) => handleUpdateText("about_edu_label", "about", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Focus (Label)</Label>
                                            <Input
                                                defaultValue={content?.["about_focus_label"] || "Comunicação Visual"}
                                                onBlur={(e) => handleUpdateText("about_focus_label", "about", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-card rounded-xl border space-y-4">
                                <h3 className="font-semibold text-lg">Contact Section</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            defaultValue={content?.["contact_email"] || "contatokaiquefontiny@outlook.com"}
                                            onBlur={(e) => handleUpdateText("contact_email", "contact", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Instagram URL</Label>
                                        <Input
                                            defaultValue={content?.["contact_instagram"] || "https://instagram.com/kaiquefontiny"}
                                            onBlur={(e) => handleUpdateText("contact_instagram", "contact", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>TikTok URL</Label>
                                        <Input
                                            defaultValue={content?.["contact_tiktok"] || ""}
                                            onBlur={(e) => handleUpdateText("contact_tiktok", "contact", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>LinkedIn URL</Label>
                                        <Input
                                            defaultValue={content?.["contact_linkedin"] || "https://linkedin.com/in/kaiquefontiny"}
                                            onBlur={(e) => handleUpdateText("contact_linkedin", "contact", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="photos" className="space-y-8">
                        {/* Add New Photo */}
                        <div className="p-6 bg-card rounded-xl border space-y-4">
                            <h3 className="font-semibold text-lg">Add New Photo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Image URL (Google Drive ID logic handled in code, but paste direct link here for now)</Label>
                                    <Input
                                        placeholder="https://..."
                                        value={newPhoto.src}
                                        onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        placeholder="Project Title"
                                        value={newPhoto.title}
                                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input
                                        placeholder="fashion, portrait..."
                                        value={newPhoto.category}
                                        onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section</Label>
                                    <select
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={newPhoto.section}
                                        onChange={(e) => setNewPhoto({ ...newPhoto, section: e.target.value })}
                                    >
                                        <option value="gallery">Gallery</option>
                                        <option value="horizontal">Horizontal Scroll</option>
                                    </select>
                                </div>
                            </div>
                            <Button onClick={() => addPhotoMutation.mutate(newPhoto)}>Add Photo</Button>
                        </div>

                        {/* List Photos */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {photos?.map((photo) => (
                                <div key={photo.id} className="group relative aspect-video bg-muted rounded-lg overflow-hidden border">
                                    <img src={photo.src} alt={photo.alt || ""} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button variant="destructive" size="sm" onClick={() => deletePhotoMutation.mutate({ id: photo.id })}>
                                            Delete
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs">
                                        {photo.title} ({photo.section})
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
