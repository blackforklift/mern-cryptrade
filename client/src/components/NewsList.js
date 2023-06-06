import React, { useState, useEffect } from "react";
import { useGetArticlesQuery } from "state/api";
import { Typography, CircularProgress, TextField, Paper, Box, useTheme, CardMedia,Grid } from "@mui/material";

const NewsComponent = () => {
  const theme = useTheme();
  const { data, error, isLoading, refetch } = useGetArticlesQuery();
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
 console.log(data)
  useEffect(() => {
    // Haberleri çekmek için isteği otomatik olarak tetikle
    refetch();
    const interval = setInterval(() => {
      refetch();
    }, 60000); // Her 1 dakikada bir yenile

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  const handleExpandArticle = (article) => {
    setExpandedArticle(article);
  };

  const handleCollapseArticle = () => {
    setExpandedArticle(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = data?.results?.filter((article) =>
  article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  article.description.toLowerCase().includes(searchTerm.toLowerCase())
);


  const highlightSearchTerm = (text) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");

    return text.replace(regex, "<mark>$1</mark>");
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <div>
      <Typography variant="h1">Kripto Haberleri</Typography>
      <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Haber Ara"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
      </Grid>

      {filteredArticles &&
        filteredArticles.map((article) => (
          <Paper key={article.id} sx={{ p: 2, mt: 2, cursor: "pointer" }} onClick={() => handleExpandArticle(article)}>
            {article.image_url && (
              <CardMedia component="img" src={article.image_url} alt={article.title} sx={{ maxHeight: 200, objectFit: "cover" }} />
            )}
            <Typography variant="h3" dangerouslySetInnerHTML={{ __html: highlightSearchTerm(article.title) }} />
            <Typography >
              {highlightSearchTerm(article.description)}
            </Typography>
            {expandedArticle === article && (
              <Box sx={{ mt: 2 }}>
                <Typography dangerouslySetInnerHTML={{ __html: highlightSearchTerm(article.content) }} />
              </Box>
            )}
          </Paper>
        ))}
    </div>
  );
};

export default NewsComponent;
