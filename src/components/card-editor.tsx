"use client"

import { getMyCard } from "@/actions/getBusinessCard"
import { updateStyles } from "@/actions/updateStyles"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Copy,
    Save
} from "lucide-react"
import { enqueueSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { z } from "zod"
import ColorPicker from "./ui/color-picker"
import { useRouter } from "next/navigation";

const initialCardData = {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    secondaryTextColor: "#888888",
}

const fontSizeOptions = {
    Small: "text-sm",
    Medium: "text-base",
    Large: "text-lg",
    XL: "text-xl",
    "2XL": "text-2xl",
    "3XL": "text-3xl",
    "4XL": "text-4xl",
}

export const StylesSchema = z.object({
    backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Background color must be a valid hex color"),
    textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Text color must be a valid hex color"),
    secondaryTextColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Secondary text color must be a valid hex color"),
})

export default function BusinessCardEditor() {
    const [cardData, setCardData] = useState<z.infer<typeof StylesSchema>>(initialCardData)
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            const cards = await getMyCard()
            if (cards.length > 0)
                setCardData(cards[0]?.styles as unknown as z.infer<typeof StylesSchema>)
        }
        fetchData()
    }, [])

    const handleColorChange = (key: string, value: string) => {
        setCardData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleSizeChange = (key: string, value: string) => {
        setCardData((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleBorderRadiusChange = (value: number[]) => {
        setCardData((prev) => ({
            ...prev,
            borderRadius: value[0],
        }))
    }

    const handleToggleIcons = (checked: boolean) => {
        setCardData((prev) => ({
            ...prev,
            showIcons: checked,
        }))
    }

    const handleRefresh = () => {
        window.location.reload();
    };

    async function onSubmit(values: z.infer<typeof StylesSchema>) {
        try {
            await updateStyles(values)
            enqueueSnackbar('Card updated 🚀', { variant: 'success', autoHideDuration: 2000 });
            handleRefresh()
        }
        catch (e) {
            enqueueSnackbar('🥲 Card update failed', { variant: 'error', autoHideDuration: 2000 });
        }
    }

    return (
        <div className="h-screen absolute inset-0">
            <Sidebar className="border-r-0">
                <SidebarHeader>
                    <div className="flex items-center p-2">
                        <SidebarTrigger className="mr-4" />
                        <h2 className="text-lg font-semibold text-white">Card Editor</h2>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Tabs defaultValue="style" className="w-full">
                        <TabsList className="grid w-full grid-cols-1">
                            <TabsTrigger value="style" className="text-sm">
                                Style
                            </TabsTrigger>
                            {/* <TabsTrigger value="layout" className="text-sm">
                                Layout
                            </TabsTrigger> */}
                        </TabsList>

                        <TabsContent value="style" className="mt-0">
                            <SidebarGroup>
                                <SidebarGroupLabel>Colors</SidebarGroupLabel>
                                <SidebarGroupContent>

                                    <div className="space-y-4 p-1">

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="bgColor" className="text-xs text-gray-400">
                                                    Background
                                                </Label>
                                                <div
                                                    className="h-5 w-5 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: cardData.backgroundColor }}
                                                />
                                            </div>
                                            <ColorPicker
                                                value={cardData.backgroundColor}
                                                onChange={(value) => handleColorChange("backgroundColor", value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="textColor" className="text-xs text-gray-400">
                                                    Name
                                                </Label>
                                                <div
                                                    className="h-5 w-5 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: cardData.textColor }}
                                                />
                                            </div>
                                            <ColorPicker
                                                value={cardData.textColor}
                                                onChange={(value) => handleColorChange("textColor", value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="secondaryTextColor" className="text-xs text-gray-400">
                                                    Title
                                                </Label>
                                                <div
                                                    className="h-5 w-5 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: cardData.secondaryTextColor }}
                                                />
                                            </div>
                                            <ColorPicker
                                                value={cardData.secondaryTextColor}
                                                onChange={(value) => handleColorChange("secondaryTextColor", value)}
                                            />
                                        </div>

                                        {/* <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="accentColor" className="text-xs text-gray-400">
                                                    Accent Color
                                                </Label>
                                                <div
                                                    className="h-5 w-5 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: cardData.accentColor }}
                                                />
                                            </div>
                                            <ColorPicker
                                                value={cardData.accentColor}
                                                onChange={(value) => handleColorChange("accentColor", value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="borderColor" className="text-xs text-gray-400">
                                                    Border Color
                                                </Label>
                                                <div
                                                    className="h-5 w-5 rounded-full border border-gray-700"
                                                    style={{ backgroundColor: cardData.borderColor }}
                                                />
                                            </div>
                                            <ColorPicker
                                                value={cardData.borderColor}
                                                onChange={(value) => handleColorChange("borderColor", value)}
                                            />
                                        </div> */}
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup>

                            {/* <SidebarGroup>
                                <SidebarGroupLabel>Typography</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <div className="space-y-4 p-1">
                                        <div className="space-y-2">
                                            <Label htmlFor="nameSize" className="text-xs text-gray-400">
                                                Name Size
                                            </Label>
                                            <Select
                                                value={cardData.nameSize}
                                                onValueChange={(value) => handleSizeChange("nameSize", value)}
                                            >
                                                <SelectTrigger id="nameSize" className="h-8">
                                                    <SelectValue placeholder="Select size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(fontSizeOptions).map(([name, value]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="titleSize" className="text-xs text-gray-400">
                                                Title Size
                                            </Label>
                                            <Select
                                                value={cardData.titleSize}
                                                onValueChange={(value) => handleSizeChange("titleSize", value)}
                                            >
                                                <SelectTrigger id="titleSize" className="h-8">
                                                    <SelectValue placeholder="Select size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(fontSizeOptions).map(([name, value]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="detailsSize" className="text-xs text-gray-400">
                                                Details Size
                                            </Label>
                                            <Select
                                                value={cardData.detailsSize}
                                                onValueChange={(value) => handleSizeChange("detailsSize", value)}
                                            >
                                                <SelectTrigger id="detailsSize" className="h-8">
                                                    <SelectValue placeholder="Select size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(fontSizeOptions).map(([name, value]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup> */}

                            {/* <SidebarGroup>
                                <SidebarGroupLabel>Shape</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <div className="space-y-4 p-1">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="borderRadius" className="text-xs text-gray-400">
                                                    Border Radius
                                                </Label>
                                                <span className="text-xs text-gray-400">{cardData.borderRadius}px</span>
                                            </div>
                                            <Slider
                                                id="borderRadius"
                                                min={0}
                                                max={32}
                                                step={1}
                                                value={[cardData.borderRadius]}
                                                onValueChange={handleBorderRadiusChange}
                                                className="py-2"
                                            />
                                        </div>
                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup> */}
                        </TabsContent>

                        {/* <TabsContent value="layout" className="mt-0">
                            <SidebarGroup>
                                <SidebarGroupLabel>Display Options</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <div className="space-y-4 p-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="showIcons" className="text-xs text-gray-400">
                                                Show Icons
                                            </Label>
                                            <Switch id="showIcons" checked={cardData.showIcons} onCheckedChange={handleToggleIcons} />
                                        </div>

                                    </div>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </TabsContent> */}
                    </Tabs>
                </SidebarContent>
                <SidebarFooter className="border-t border-gray-800 p-4">
                    <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                        </Button>
                        <Button size="sm" onClick={() => { onSubmit(cardData) }}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}