module.exports = ({repo, version}) => {
    return {
        package: {
            dependencies: {
                'swr': version || `https://github.com/${repo}.git`,
                'next': '^9.2',
                'react': '^16.9',
                'react-dom': '^16.9'
            },
            devDependencies: {
                '@types/node': '^11.12.0',
                '@types/react': '^16.9',
                '@types/react-dom': '^16.9',
                'typescript': '^3.7'
            },
            scripts: {
                start: 'next dev'
            }
        },
        files: [
            {
                path: '.gitignore',
                content: '.next\nnode_modules'
            },
            {
                path: 'pages/api/data.ts',
                content: `export default function(req, res) {
    res.send(Date.now());
}`
            },
            {
                path: 'pages/index.tsx',
                content: `import React from 'react';
import useSWR from 'swr';

export default function Page() {
    const {data} = useSWR(
        '/api/data',
            (url) => fetch(url).then((x) => x.text()),
            {refreshInterval: 250, dedupingInterval: 50}
        );

    return (
        <div>{data}</div>
    );
}`
            }
        ]
    }
}
