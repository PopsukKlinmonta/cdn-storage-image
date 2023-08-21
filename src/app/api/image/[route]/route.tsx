import { NextResponse, NextRequest } from "next/server";
import * as fs from 'fs';
import { unlink } from 'fs/promises'
import * as path from 'path';
import key  from "../../../../../key.json"
import { readFileSync } from "fs";
const cache = {} as Record<string, Buffer>;

const dirPath = path.join(process.cwd(), '/src/app/api/image/img/');
const id = fs.readdirSync(dirPath);

const Cache = async (id: string) => {
	if (!cache[id])
		cache[id] = readFileSync(process.cwd() + `/src/app/api/image/img/${id}`);
	return cache[id];
}

export const GET = async (req: NextRequest, {params}: { params?: any }) => {
	try {
		return new Response(await Cache(params.route), {
			headers: {
				'Cache-control': 'public, max-age=3600',
				'content-type': 'image/webp'
			}
		});
	} catch (e) {
		return new NextResponse(null, { status: 500 });
	}
}
export const DELETE = async (req: NextRequest, { params }:any) => {
	try {
		await unlink(process.cwd() + `/src/app/api/image/img/${params.route}`);
		return new Response("Gay");
	} catch (e) {
        console.log(e)
		return new Response(null, { status: 500 });
	}
}
