#include <iostream>

int main()
{
    int x { 0 };
    int y { 0 };

    int result { (x = y = 7) };

    std::cout << result << ' ' << x << ' ' << y << '\n';
    return 0;
}
