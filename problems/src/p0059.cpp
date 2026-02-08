#include <iostream>

int main()
{
    int x { 2 };

    int y { (x = 5) };

    std::cout << y << ' ' << x << '\n';
    return 0;
}
