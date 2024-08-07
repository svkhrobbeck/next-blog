import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Avatar, Box, Divider, Typography } from "@mui/material";

import { calcEstimatedReadTime } from "@/helpers/time";
import { IContentProps } from "./content.props";

const Content: FC<IContentProps> = ({ blogs }): JSX.Element => {
  return (
    <Box color="white">
      {blogs.map((blog, idx) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`}>
          <Box
            component="article"
            {...(idx !== blogs.length - 1 && { mb: "20px" })}
            bgcolor="rgba(0, 0, 0, 0.5)"
            p="20px"
            borderRadius="8px"
            boxShadow="0 8px 16px rgba(255, 255, 255, 0.2)"
          >
            <Box mb="30px" position="relative" width="100%" height="50vh">
              <Image src={blog.image.url} alt={blog.title} style={{ borderRadius: "10px" }} fill objectFit="cover" />
            </Box>
            <Typography sx={{ fontSize: { xs: "20px", sm: "23px", md: "29px", lg: "34px" } }} mb="12px">
              {blog.title}
            </Typography>
            <Typography color="gray" variant="body1">
              {blog.excerpt}
            </Typography>
            <Divider color="gray" sx={{ my: "14px" }} />
            <Box display="flex" gap="10px" alignItems="center">
              <Avatar src={blog.author.avatar.url} alt={blog.author.name} />
              <Box>
                <Typography>{blog.author.name}</Typography>
                <Typography variant="body2" color="gray" component="time">
                  {format(new Date(blog.createdAt), "dd MMM, yyyy")} &#x2022;{" "}
                  {calcEstimatedReadTime(blog.description.text)} min read
                </Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Content;
