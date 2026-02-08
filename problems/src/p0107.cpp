#include <iostream>

int calculate(int, int);

int main()
{
    std::cout << calculate(1, 2, 3) << '\n';
    return 0;
}

int calculate(int x, int y, int z)
{
    return x + y + z;
}
