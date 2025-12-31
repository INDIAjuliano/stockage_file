export default function SiteFooter() {
    return (
        <footer style={{ padding: 12, borderTop: "1px solid #e5e7eb", marginTop: 24 }}>
            <small>© {new Date().getFullYear()} MonApp</small>
        </footer>
    );
}
