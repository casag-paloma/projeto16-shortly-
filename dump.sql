--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "visitCount" bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "urlsVisitCount" bigint DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "userId", token, "createdAt") FROM stdin;
1	1	057a28b3-80a7-44a9-bccc-e6ab37c5c39c	2022-08-08 12:23:29.734454
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, url, "shortUrl", "userId", "createdAt", "visitCount") FROM stdin;
2	{"url":"https://www.google.com/search?channel=fs&client=ubuntu&q=meme+nazare+confusa"}	MprAdcufJeY1zI9rcKLht	1	2022-08-08 12:32:23.283092	0
3	{"url":"https://www.google.com/search?channel=fs&client=ubuntu&q=meme+nazare+confusa"}	PzvEht6UeskxlmoS3v1yV	1	2022-08-08 12:32:45.122311	2
4	https://www.google.com/search?channel=fs&client=ubuntu&q=meme+nazare+confusa	pVQj3bmF9RGMrfPbnP8uo	1	2022-08-08 12:38:24.67917	1
5	https://www.google.com/search?channel=fs&client=ubuntu&q=meme+nazare+confusa	EuKg6tIWJBc4RIlxui7FG	1	2022-08-08 13:23:41.305999	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "fullName", email, password, "urlsVisitCount", "createdAt") FROM stdin;
1	Paloma	paloma@gmail.com	$2b$10$xZg.qBdyvmvZh1lWaIpkbuhylKrwNJ0R9D/Pc4RVWcf5zHwFahTp.	2	2022-08-08 12:23:11.827478
2	Paloma	paloma1@gmail.com	$2b$10$fN0vWNi2dYTU.d5U0fDDAuOqIfmyQkQVvPC3T35nMmc65lH9Ntkza	0	2022-08-08 13:28:19.119415
3	Paloma	paloma2@gmail.com	$2b$10$bVVeQgyGpS51esVHqDlG0.QlE8vjU45Rq3p1jj7918cSIjVqy6h1a	0	2022-08-08 13:28:23.971442
4	Paloma	paloma3@gmail.com	$2b$10$KfHZNkdCuFjg1t1bu1CpP.NOY9uOWZyfS8zFzJCNpJzMsOryhF3t.	0	2022-08-08 13:28:29.318127
5	Paloma	paloma4@gmail.com	$2b$10$aAe1U58OSQ10ysXy3wUPde6nITAtkYJ4vTj0SV77znks5pUB6NDW.	0	2022-08-08 13:28:32.455318
6	Paloma	paloma5@gmail.com	$2b$10$sAmEvd0iu8ERj/eHcFC8guzcShVzdOV7S6vZa0qWnzrIFYcyp364O	0	2022-08-08 13:28:36.102177
7	Paloma	paloma6@gmail.com	$2b$10$yrZFrruwzh76Zx3dr/IRKOO3ZDaHrdYJnahFoCBtmbWjpvEPAhLxq	0	2022-08-08 13:28:39.843999
8	Paloma	paloma7@gmail.com	$2b$10$snRnjySKPHbpJXrsbGit/ekzfQzgcIoLxwPOj1wGEPG71CHX03yxG	0	2022-08-08 13:28:43.370015
9	Paloma	paloma8@gmail.com	$2b$10$mBkEQbfDQuAHahoVnjCs9O8U5Pg9cfncDr.vJbi8DlSjzRZPVVPbi	0	2022-08-08 13:28:50.764285
10	Paloma	paloma9@gmail.com	$2b$10$YYhItUFy7QT2j3tuVaWit.tYVqMtEP8ostI2Y6FxvU9fpACdJpBve	0	2022-08-08 13:28:54.392099
11	Paloma	paloma10@gmail.com	$2b$10$dBaROHMExirvN9t9a2/bCOQDVWSLgpyh/7TJtWQXY5yVWy1rZHFby	0	2022-08-08 13:28:58.077933
12	Paloma	paloma11@gmail.com	$2b$10$qjiXszDpfpqXtQU/gOE17usLj0Fz6rI0JuZK8J.55MzDFFjpgFIW.	0	2022-08-08 13:29:01.684151
13	Paloma	paloma12@gmail.com	$2b$10$nbfWVWlcSCgUDXsQi7njz.jVM35x8kmXIGd1vh5pfbqJuexVY1Uo2	0	2022-08-08 13:29:05.564519
14	Paloma	paloma13@gmail.com	$2b$10$Z7MeXkUrx0QRlgMYasd5T.cmvOfLP1GemRjTzImPoPxOGa8a47Kea	0	2022-08-08 13:29:08.777985
15	Paloma	paloma14@gmail.com	$2b$10$95fCJgkAW.IwTzwyvSpZyuyjkscC2r5PFa5xMqG.9BWRnnH0BLX4S	0	2022-08-08 13:29:11.608925
16	Paloma	paloma15@gmail.com	$2b$10$rJMrCzQc3.K5yCps36mp6.YK1C7MxS5tuiMD6.3kZIoRViLaiRhmW	0	2022-08-08 13:29:15.916724
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

