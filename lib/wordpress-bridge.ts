
const WP_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost/graphql';
const WP_API_SECRET = process.env.WP_API_SECRET_KEY;

interface WPGraphQLParams {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>;
}

export async function getWPData({ query, variables = {} }: WPGraphQLParams) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (WP_API_SECRET) {
    headers['Authorization'] = `Bearer ${WP_API_SECRET}`;
  }

  try {
    const res = await fetch(WP_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    });

    if (!res.ok) {
        throw new Error(`WordPress API responded with status ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error('WPGraphQL Errors:', json.errors);
      throw new Error('Failed to fetch data from WordPress');
    }

    return json.data;
  } catch (error) {
    console.error('WP Bridge Error:', error);
    throw error;
  }
}

/**
 * Parses WordPress content to identify and handle shortcodes or blocks.
 * This is a "Plugin Tunnel" stub.
 * 
 * @param content The raw HTML content from WordPress.
 * @returns The parsed content (potentially with React components hydrated on the frontend).
 */
export function parsePluginContent(content: string): string {
    // In a real implementation, this would use `html-react-parser` or similar
    // to replace shortcode output with Next.js components if needed.
    // For "Contact Form 7", we typically render the HTML form provided by WP,
    // or intercept the form submission.
    
    // For now, we pass it through, assuming the "Bridge" relies on 
    // WP outputting the HTML for the shortcode.
    return content;
}
