import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs';
import * as path from 'path';
import key  from "../../../../key.json"
import types from "../../../../type.json"
import sharp from 'sharp';
import { unlink } from "fs/promises"
 
export const GET = ( req: NextRequest) => {
    try {
        const auth = key.includes(req.nextUrl.searchParams.get("key") || '')
        if(!auth) return new Response(null, { status: 404 });
        const dirPath = path.join(process.cwd(), 'src/app/api/image/img/');
        const files = fs.readdirSync(dirPath);

        return NextResponse.json({ files })
    } catch (e) {
        console.error(e);
        return new Response(null, { status: 404 });
    }
}

export const POST = async (req: NextRequest) => {
	try {
        const auth = key.includes(req.nextUrl.searchParams.get("key") || '')
        if (!auth) return new Response(null, { status: 404 });
		const data = await req.formData()
		const files: File | null = data.get('file') as unknown as File
		if (!types) return NextResponse.json({ success: false })
		if (!types.includes(files.type)) return NextResponse.json({ success: false })
		const bytes = await files.arrayBuffer()
		const buffer = Buffer.from(bytes)
        const datas = { id: Math.random().toString(36).substring(1) }
		await sharp(buffer).webp({ effort: 6, quality: 80, alphaQuality: 50 }).toFile(process.cwd() + `/src/app/api/image/img/${datas.id}.webp`)
		return NextResponse.json({ success: true, id: datas.id, })
	} catch (e) {
		return NextResponse.json({ success: false })
	}
}
