import Head from "next/head";
import { Meta } from "../components/shared/Meta";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Button } from "../components/ui/Button";

export default function Home() {
    const { data, loading } = useMeQuery();
    return (
        <div>
            <Head>
                <title>Apollo Home</title>
                <Meta title={"Apollo . Home"} />
            </Head>
            {data && !loading ? (
                <>
                    <pre style={{ fontFamily: "Menlo !important" }}>
                        {JSON.stringify(data.me, null, 4)}
                    </pre>
                    <NextLink href="/app" passHref={true}>
                        <Button>Go to Dashboard</Button>
                    </NextLink>

                    <NextLink href="/login" passHref={true}>
                        <Button>Go to Login</Button>
                    </NextLink>
                </>
            ) : (
                <pre style={{ fontFamily: "Menlo" }}>Not logged in!</pre>
            )}
        </div>
    );
}
