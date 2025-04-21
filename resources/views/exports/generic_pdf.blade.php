<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ ucfirst($name) }} Export</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        h1 { text-align: center; margin-bottom: 0; }
        p.timestamp { text-align: center; margin-top: 4px; font-size: 10px; color: #555; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 6px;
            text-align: left;
        }

        th {
            background-color: #f4f4f4;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <h1>{{ ucfirst($name) }} Report</h1>
    <p class="timestamp">Generated at: {{ $timestamp }}</p>

    <table>
        <thead>
            <tr>
                @foreach ($headings as $heading)
                    <th>{{ $heading }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @forelse ($items as $item)
                <tr>
                    @foreach ($headings as $key)
                        <td>{{ data_get($item, $key, '-') }}</td>
                    @endforeach
                </tr>
            @empty
                <tr>
                    <td colspan="{{ count($headings) }}" style="text-align: center;">No data available.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
