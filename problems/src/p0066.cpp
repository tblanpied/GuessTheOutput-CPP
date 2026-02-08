void doNothing()
{
}

int main()
{
    int x{ doNothing() };
    (void)x;
    return 0;
}
