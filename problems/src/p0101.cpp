#include <iostream>

int magic(int x, int y);

int main()
{
    std::cout << "Magic: " << magic(10, 2) << '\n';
    return 0;
}

int magic(int a, int b)
{
    return a / b;
}
